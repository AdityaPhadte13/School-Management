const db = require("../util/database");

module.exports = class examination {
  constructor(ExamID, ExamStartDate, ExamEndDate, ExamMaxMarks, ExamMinMarks) {
    this.ExamID = ExamID;
    this.ExamStartDate = ExamStartDate;
    this.ExamEndDate = ExamEndDate;
    this.ExamMaxMarks = ExamMaxMarks;
    this.ExamMinMarks = ExamMinMarks;
  }

  //   Queries Here
};
