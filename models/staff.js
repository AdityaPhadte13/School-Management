const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class staff {
  constructor(
    StaffID,
    Fname,
    Mname,
    Lname,
    BirthDate,
    JoinDate,
    Gender,
    Qualification,
    Address,
    Salary,
    Post,
    Email,
    Username,
    Password,
    AdminPrivileges,
    PhoneNo
  ) {
    this.StaffID = StaffID;
    this.Fname = Fname;
    this.Mname = Mname;
    this.Lname = Lname;
    this.BirthDate = BirthDate;
    this.JoinDate = JoinDate;
    this.Gender = Gender;
    this.Qualification = Qualification;
    this.Address = Address;
    this.Salary = Salary;
    this.Post = Post;
    this.Email = Email;
    this.Username = Username;
    this.Password = Password;
    this.AdminPrivileges = AdminPrivileges;
    this.PhoneNo = [].concat(PhoneNo);
  }

  // INSERT QUERIES START

  save() {
    console.log(this);
    return this.insertStaff().then(() => {
      return this.insertStaffPost().then(() => {
        return this.insertStaffLogin().then(() => {
          return this.insertStaffPhone();
        });
      });
    });
  }

  insertStaff() {
    return db.execute(
      `INSERT INTO staff( Fname, Mname, Lname, BirthDate, JoinDate, Gender, Qualification, Address, Salary) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        this.Fname,
        this.Mname,
        this.Lname,
        this.BirthDate,
        this.JoinDate,
        this.Gender,
        this.Qualification,
        this.Address,
        this.Salary
      ]
    );
  }

  insertStaffPost() {
    return db
      .execute(`SELECT max(StaffID) as "StaffID" FROM staff`)
      .then(([row]) => {
        this.StaffID = row[0].StaffID;
        return db.execute(
          `INSERT INTO non_teaching(StaffID, Post) VALUES (?, ?)`,
          [this.StaffID, this.Post]
        );
      });
  }

  async insertStaffLogin() {
    this.Username = this.Fname.toLowerCase() + String(this.StaffID);
    this.Password =
      this.Fname.toLowerCase() + new Date(this.BirthDate).getFullYear();
    this.AdminPrivileges =
      this.AdminPrivileges === "on" || this.AdminPrivileges == "1"
        ? true
        : false;
    const Password = await bcrypt.hash(this.Password, 10);
    return db.execute(
      `INSERT INTO non_teaching_login_info(StaffID, Email, Username, Password, AdminPrivileges) 
      VALUES (?, ?, ?, ?, ?)`,
      [this.StaffID, this.Email, this.Username, Password, this.AdminPrivileges]
    );
  }

  insertStaffPhone() {
    return db
      .execute("INSERT INTO staff_phone_no(StaffID, PhoneNo) VALUES (?,?)", [
        this.StaffID,
        this.PhoneNo[0]
      ])
      .then(([row]) => {
        return db.execute(
          "INSERT INTO staff_phone_no(StaffID, PhoneNo) VALUES (?,?)",
          [this.StaffID, this.PhoneNo[1]]
        );
      });
  }

  // INSERT QUERIES END

  // UPDATE QUERIES START

  update() {
    return this.updateStaff().then(() => {
      return this.updateStaffPost().then(() => {
        return this.updateStaffLogin().then(() => {
          return staff.UpdatePhone(
            this.StaffID,
            this.PhoneNo[0],
            this.PhoneNo[1]
          );
        });
      });
    });
  }

  updateStaff() {
    return db.execute(
      `UPDATE staff 
      SET Fname=?,Mname=?,Lname=?,BirthDate=?,JoinDate
      =?,Gender=?,Qualification=?,Address=?,Salary=? WHERE StaffID= ?`,
      [
        this.Fname,
        this.Mname,
        this.Lname,
        this.BirthDate,
        this.JoinDate,
        this.Gender,
        this.Qualification,
        this.Address,
        this.Salary,
        this.StaffID
      ]
    );
  }

  updateStaffPost() {
    return db.execute(`UPDATE non_teaching SET Post=? WHERE StaffID= ?`, [
      this.Post,
      this.StaffID
    ]);
  }

  updateStaffLogin() {
    this.AdminPrivileges =
      this.AdminPrivileges === "on" || this.AdminPrivileges == "1"
        ? true
        : false;
    return db.execute(
      `UPDATE non_teaching_login_info SET Email = ?, AdminPrivileges = ? WHERE StaffID = ?`,
      [this.Email, this.AdminPrivileges, this.StaffID]
    );
  }

  // UPDATE QUERIES END

  static ResetPass(id) {
    return staff.FetchByID(id).then(([staff]) => {
      if (staff.length === 0) {
        return;
      }
      const Password =
        staff[0].Fname.toLowerCase() +
        new Date(staff[0].BirthDate).getFullYear();
      return bcrypt.hash(Password, 10).then(hash => {
        return db.execute(
          "UPDATE `non_teaching_login_info` SET  non_teaching_login_info.Password = ? WHERE StaffID = ?",
          [hash, id]
        );
      });
    });
  }

  static Delete(id) {
    return db.execute(`DELETE FROM staff WHERE StaffID = ?`, [id]);
  }

  static UpdatePhone(StaffID, PhoneNo1, PhoneNo2) {
    return db
      .execute(`SELECT * FROM staff_phone_no WHERE StaffID = ?`, [StaffID])
      .then(([staff]) => {
        console.log(staff[0].PhoneNo, PhoneNo1);
        return db
          .execute(
            "UPDATE staff_phone_no SET PhoneNo = ? WHERE StaffID = ? AND PhoneNo = ?",
            [PhoneNo1, StaffID, String(staff[0].PhoneNo)]
          )
          .then(([row]) => {
            console.log(staff[1].PhoneNo, PhoneNo2);
            return db.execute(
              "UPDATE staff_phone_no SET PhoneNo = ? WHERE StaffID = ? AND PhoneNo = ?",
              [PhoneNo2, StaffID, String(staff[1].PhoneNo)]
            );
          });
      });
  }

  static FetchAll() {
    return db.execute(
      `SELECT s.*, n.Post, l.Email, l.Username, l.Password, l.AdminPrivileges, p.PhoneNo 
      FROM staff s, non_teaching n, non_teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = n.StaffID AND n.StaffID = l.StaffID AND s.StaffID = p.StaffID 
      GROUP BY s.StaffID;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, n.Post, l.Email, l.Username, l.Password, l.AdminPrivileges, p.PhoneNo 
      FROM staff s, non_teaching n, non_teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = n.StaffID AND n.StaffID = l.StaffID AND s.StaffID = p.StaffID AND s.StaffID = ? 
      GROUP BY s.StaffID;`,
      [Id]
    );
  }

  static FetchNameByID(Id) {
    return db.execute(`SELECT s.Fname FROM staff s WHERE s.StaffID = ?;`, [Id]);
  }

  static FetchByLogin(Username) {
    return db.execute(
      "SELECT * FROM non_teaching_login_info s WHERE s.Email = ? OR s.Username = ?",
      [Username, Username]
    );
  }

  static FetchLoginByID(Id) {
    return db.execute(
      "SELECT * FROM non_teaching_login_info WHERE StaffID = ?;",
      [Id]
    );
  }

  static UpdatePassword(Id, Password) {
    return db.execute(
      "UPDATE non_teaching_login_info SET Password=? WHERE StaffID = ?",
      [Password, Id]
    );
  }

  static SearchByID(Id) {
    const S = String("%" + String(Id) + "%");
    const S1 = String(Id);
    return db.execute(
      `SELECT s.*, n.Post, l.Email, l.Username, l.Password, l.AdminPrivileges, p.PhoneNo 
      FROM staff s, non_teaching n, non_teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = n.StaffID AND n.StaffID = l.StaffID AND s.StaffID = p.StaffID AND 
      (s.StaffID = ? OR s.Fname LIKE ? OR s.Mname LIKE ? OR s.Lname LIKE ? OR s.Qualification 
      LIKE ? OR s.Address LIKE ? OR n.Post LIKE ? OR s.Gender = ?)  
      GROUP BY s.StaffID;`,
      [Number(Id), S, S, S, S, S, S, S1]
    );
  }

  static FetchPhone(Id, PhoneNo) {
    return db.execute(
      `SELECT p.PhoneNo FROM staff_phone_no p WHERE p.StaffID = ? AND p.PhoneNo != ?`,
      [Id, PhoneNo]
    );
  }

  // Funtions For Insert Update And Delete records Here
};
