const db = require("../util/database");

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
    return db.execute(
      `SELECT s.*, n.Post, l.Email, l.Username, l.Password, l.AdminPrivileges, p.PhoneNo 
      FROM staff s, non_teaching n, non_teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = n.StaffID AND n.StaffID = l.StaffID AND s.StaffID = p.StaffID AND 
      (s.StaffID = ? OR s.Fname LIKE ? OR s.Mname LIKE ? OR s.Lname LIKE ?)  
      GROUP BY s.StaffID;`,
      [Number(Id), S, S, S]
    );
  }

  // Funtions For Insert Update And Delete records Here
};
