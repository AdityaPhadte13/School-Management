const db = require("../util/database");

module.exports = class subject {
  constructor(
    SubID,
    Name,
    Optional,
    MidTermMinMks,
    MidTermMaxMks,
    SemMinMks,
    SemMaxMks
  ) {
    this.SubID = SubID;
    this.Name = Name;
    this.Optional = Optional;
    this.MidTermMinMks = MidTermMinMks;
    this.MidTermMaxMks = MidTermMaxMks;
    this.SemMinMks = SemMinMks;
    this.SemMaxMks = SemMaxMks;
  }
  //Queries Here
};
