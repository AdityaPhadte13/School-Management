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
    AdminPrivileges
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
  }

  static FetchAll() {
    return db.execute(
      `SELECT s.*, n.Post, l.Email, l.Username, l.Password, l.AdminPrivileges 
      FROM staff s, non_teaching n, non_teaching_login_info l 
      WHERE s.StaffID = n.StaffID AND n.StaffID = l.StaffID;`
    );
  }

  static FetchByID(Id) {
    return db.execute(
      `SELECT s.*, n.Post, l.Email, l.Username, l.Password, l.AdminPrivileges 
      FROM staff s, non_teaching n, non_teaching_login_info l 
      WHERE s.StaffID = n.StaffID AND n.StaffID = l.StaffID AND s.StaffID = ?;`,
      [Id]
    );
  }

  static FetchAllLogin() {
    return db.execute("SELECT * FROM non_teaching_login_info;");
  }
};
