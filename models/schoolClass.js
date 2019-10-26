const db = require("../util/database");

module.exports = class schoolClass {
  constructor(ClassID, STD, Division, ClassTeacher, Strength) {
    this.ClassID = ClassID;
    this.STD = STD;
    this.Division = Division;
    this.ClassTeacher = ClassTeacher;
    this.Strength = Strength;
  }

  save() {
    db.execute(
      `INSERT INTO class(STD, Division, ClassTeacher, Strength) VALUES (?, ?, ?, ?)`,
      [this.STD, this.Division, this.ClassTeacher, this.Strength]
    );
  }

  update() {
    db.execute(
      `UPDATE class SET STD=?, Division=?, ClassTeacher=?, Strength=? WHERE ?`,
      [this.STD, this.Division, this.ClassTeacher, this.Strength, this.ClassID]
    );
  }

  static FetchAll() {
    return db.execute("SELECT * FROM class;");
  }

  static FetchById(id) {
    return db.execute("SELECT * FROM class WHERE ClassID = ?;", [id]);
  }

  static FetchAllStudents(id) {
    return db.execute("SELECT * FROM student s WHERE s.Class = ?;", [id]);
  }

  static FetchAllSubjects(id) {
    return db.execute(
      `SELECT l.*,c.STD,c.Division,s.Name FROM class_sub l,class c,subject s 
        WHERE c.ClassID = l.Class AND l.Subject = s.SubID AND l.Class = ?`,
      [id]
    );
  }

  // Some More Functions
};
