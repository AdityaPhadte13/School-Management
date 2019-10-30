const db = require("../util/database");

module.exports = class teacher {
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
    Email,
    Username,
    Password,
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
    this.Email = Email;
    this.Username = Username;
    this.Password = Password;
    this.PhoneNo = [].concat(PhoneNo);
  }

  static FetchAll() {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo
      FROM staff s, teaching t, teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = t.TeacherID AND t.TeacherID = l.TeacherID AND s.StaffID = p.StaffID
      GROUP BY t.TeacherID;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo
      FROM staff s, teaching t, teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = t.TeacherID AND t.TeacherID = l.TeacherID AND s.StaffID = p.StaffID
      AND t.TeacherID = ? GROUP BY t.TeacherID;`,
      [Id]
    );
  }

  static FetchByLogin(Username) {
    return db.execute(
      "SELECT * FROM teaching_login_info s WHERE s.Email = ? OR s.Username = ?",
      [Username, Username]
    );
  }

  static FetchLoginByID(Id) {
    return db.execute(
      "SELECT * FROM teaching_login_info WHERE TeacherID = ?;",
      [Id]
    );
  }

  static UpdatePassword(Id, Password) {
    return db.execute(
      "UPDATE teaching_login_info SET Password=? WHERE TeacherID = ?",
      [Password, Id]
    );
  }

  static SearchByID(Id) {
    const S = String("%" + String(Id) + "%");
    const S1 = String(Id);
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo FROM staff s, teaching t, teaching_login_info l, staff_phone_no p 
      WHERE s.StaffID = t.TeacherID AND t.TeacherID = l.TeacherID AND s.StaffID = p.StaffID 
      AND(t.TeacherID = ? OR s.Fname LIKE ? OR s.Mname LIKE ? OR s.Lname LIKE ? 
      OR s.Qualification LIKE ? OR s.Address LIKE ? OR s.Gender = ?) GROUP BY t.TeacherID`,
      [Number(Id), S, S, S, S, S, S1]
    );
  }
  static FetchClass(Id)
  {
    return db.execute('SELECT classid,std,Division,name FROM `teaches` t,class_sub c,class ,subject WHERE ClassSub=ID and Class=classid and subject=subid and teacher=?',[Id]
      )  }
  // Funtions For Insert Update And Delete records Here
};

`SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo FROM staff s, teaching t, teaching_login_info l, staff_phone_no p 
WHERE s.StaffID = t.TeacherID AND t.TeacherID = l.TeacherID AND s.StaffID = p.StaffID 
AND(t.TeacherID = "" OR s.Fname LIKE "%%" OR s.Mname LIKE "%%" OR s.Lname LIKE "%%" 
OR s.Qualification LIKE "%%" OR s.Address LIKE "%%" OR s.Gender = "%%") GROUP BY t.TeacherID`;
