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
    Password
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
  }

  static FetchAll() {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password 
      FROM staff s, teaching t, teaching_login_info l 
      WHERE s.StaffID = t.TeacherID AND t.TeacherID = l.TeacherID;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password 
      FROM staff s, teaching t, teaching_login_info l 
      WHERE s.StaffID = t.TeacherID AND t.TeacherID = l.TeacherID AND s.StaffID = ?;`,
      [Id]
    );
  }

  static FetchAllLogin() {
    return db.execute("SELECT * FROM teaching_login_info;");
  }
};
