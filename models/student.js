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
    Password,
    PhoneNo
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
    this.PhoneNo = [].concat(PhoneNo);
  }

  save() {
    db.execute("INSERT INTO student");
  }

  static FetchAll() {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo 
      FROM student s, student_login_info l, student_phone_no p 
      WHERE s.StudID = l.StudentID AND s.StudID = p.StudentID 
      GROUP BY s.StudID;;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo 
      FROM student s, student_login_info l, student_phone_no p 
      WHERE s.StudID = l.StudentID AND s.StudID = p.StudentID 
      AND s.StudID = ? GROUP BY s.StudID;`,
      [Id]
    );
  }

  static FetchAllLogin() {
    return db.execute("SELECT * FROM student_login_info;");
  }

  static FetchByLogin(Username) {
    return db.execute(
      "SELECT * FROM student_login_info s WHERE s.Email = ? OR s.Username = ?",
      [Username, Username]
    );
  }
  // Funtions For Insert Update And Delete records Here
};
