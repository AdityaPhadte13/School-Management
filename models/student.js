const db = require("../util/database");

module.exports = class teacher {
  constructor(
    StudID,
    Class,
    Fname,
    Mname,
    Lname,
    BirthDate,
    Gender,
    Address,
    Email,
    Username,
    Password
  ) {
    this.StudID = StudID;
    this.Class = Class;
    this.Fname = Fname;
    this.Mname = Mname;
    this.Lname = Lname;
    this.BirthDate = BirthDate;
    this.Gender = Gender;
    this.Address = Address;
    this.Email = Email;
    this.Username = Username;
    this.Password = Password;
  }

  static FetchAll() {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password 
      FROM student s, student_login_info l 
      WHERE s.StudID = l.StudentID;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password 
      FROM student s, student_login_info l 
      WHERE s.StudID = l.StudentID AND s.StudID = ?;`,
      [Id]
    );
  }

  static FetchAllLogin() {
    return db.execute("SELECT * FROM student_login_info;");
  }
};
