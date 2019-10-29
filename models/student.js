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
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo, c.STD, c.Division
      FROM student s, student_login_info l, student_phone_no p,Class c 
      WHERE s.StudID = l.StudentID AND s.StudID = p.StudentID AND c.ClassID = s.Class
      GROUP BY s.StudID;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo, c.STD, c.Division
      FROM student s, student_login_info l, student_phone_no p,Class c 
      WHERE s.StudID = l.StudentID AND s.StudID = p.StudentID 
      AND c.ClassID = s.Class AND s.StudID = ?
      GROUP BY s.StudID;`,
      [Id]
    );
  }

  static FetchAllLogin() {
    return db.execute("SELECT * FROM student_login_info;");
  }

  static FetchNameByID(Id) {
    return db.execute(`SELECT s.Fname FROM student s WHERE s.StudID = ?;`, [
      Id
    ]);
  }

  static FetchByLogin(Username) {
    return db.execute(
      "SELECT * FROM student_login_info s WHERE s.Email = ? OR s.Username = ?",
      [Username, Username]
    );
  }

  static FetchLoginByID(Id) {
    return db.execute("SELECT * FROM student_login_info WHERE StudentID = ?;", [
      Id
    ]);
  }

  static UpdatePassword(Id, Password) {
    return db.execute(
      "UPDATE student_login_info SET Password=? WHERE StudentID = ?",
      [Password, Id]
    );
  }

  static SearchByID(Id, sClass = "") {
    const S = String("%" + String(Id) + "%");
    const S1 = String(Id);
    if (sClass === "") {
      return db.execute(
        `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo, c.STD, c.Division
      FROM student s, student_login_info l, student_phone_no p,Class c 
      WHERE s.StudID = l.StudentID AND s.StudID = p.StudentID 
      AND c.ClassID = s.Class AND (s.StudID = ? OR s.RollNo = ? OR s.Fname LIKE ? OR s.Mname LIKE ? 
      OR s.Lname LIKE ? OR s.Address LIKE ? OR s.Gender = ?)
      GROUP BY s.StudID;`,
        [Number(Id), Number(Id), S, S, S, S, S1]
      );
    } else {
      return db.execute(
        `SELECT s.*, l.Email, l.Username, l.Password, p.PhoneNo, c.STD, c.Division
      FROM student s, student_login_info l, student_phone_no p,Class c 
      WHERE s.StudID = l.StudentID AND s.StudID = p.StudentID 
      AND c.ClassID = s.Class AND (s.StudID = ? OR s.RollNo = ? OR s.Fname LIKE ? OR s.Mname LIKE ? 
      OR s.Lname LIKE ? OR s.Address LIKE ? OR s.Gender = ?) AND s.Class = ?
      GROUP BY s.StudID;`,
        [Number(Id), Number(Id), S, S, S, S, S1, Number(sClass)]
      );
    }
  }

  static FetchPhone(Id, PhoneNo) {
    return db.execute(
      `SELECT p.PhoneNo FROM student_phone_no p WHERE p.StudentID = ? AND p.PhoneNo != ? `,
      [Id, PhoneNo]
    );
  }

  // Funtions For Insert Update And Delete records Here
};
