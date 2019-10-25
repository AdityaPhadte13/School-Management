const db = require("../util/database");

module.exports = class fees {
  constructor(FeeID, Amount, DatePaid, PaidBy) {
    this.FeeID = FeeID;
    this.Amount = Amount;
    this.DatePaid = DatePaid;
    this.PaidBy = PaidBy;
  }
  //Queries Here
};
