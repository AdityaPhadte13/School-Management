const db = require("../util/database");

module.exports = class notice {
  constructor(NoticeID, PostedBy, Title, Summary, DatePosted, FileLocation) {
    this.NoticeID = NoticeID;
    this.PostedBy = PostedBy;
    this.Title = Title;
    this.Summary = Summary;
    this.DatePosted = DatePosted;
    this.FileLocation = FileLocation;
  }
  save() {
    db.execute(
      `
      INSERT INTO notice(PostedBy, Title, Summary, DatePosted, FileLocation) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        this.PostedBy,
        this.Title,
        this.Summary,
        this.DatePosted,
        this.FileLocation
      ]
    );
  }

  update() {
    db.execute(
      `UPDATE notice SET 
      PostedBy= ?,
      Title= ?,
      Summary= ?,
      DatePosted= ?,
      FileLocation= ? 
      WHERE NoticeID = ?`,
      [
        this.PostedBy,
        this.Title,
        this.Summary,
        this.DatePosted,
        this.FileLocation,
        this.NoticeID
      ]
    );
  }

  static FetchAll() {
    return db.execute("SELECT * FROM notice ORDER BY notice.DatePosted DESC");
  }

  static FetchByID(id) {
    return db.execute("SELECT * FROM `notice` WHERE `NoticeID` = 1;", [id]);
  }

  static FetchNoticeBy(PostedBy) {
    return db.execute(`SELECT * FROM notice WHERE PostedBy = ?`, [PostedBy]);
  }
};
