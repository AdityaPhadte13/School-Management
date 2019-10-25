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
  // Queries Here
};
