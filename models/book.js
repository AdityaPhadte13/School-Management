const db = require("../util/database");

module.exports = class book {
  constructor(BookNumber, Title, Author, Publisher, Edition, PublishDate) {
    this.BookNumber = BookNumber;
    this.Title = Title;
    this.Author = Author;
    this.Publisher = Publisher;
    this.Edition = Edition;
    this.PublishDate = PublishDate;
  }

  save() {
    db.execute(
      `INSERT INTO books(BookNumber, Title, Author, Publisher, Edition, PublishDate) 
      VALUES (?,?,?,?,?,?)`,
      [
        this.BookNumber,
        this.Title,
        this.Author,
        this.Publisher,
        this.Edition,
        this.PublishDate
      ]
    );
  }

  update() {
    db.execute(
      `UPDATE books SET 
      Title= ?, Author= ?, Publisher= ?, Edition= ?, PublishDate=? WHERE BooKNumber = ?`,
      [
        this.Title,
        this.Author,
        this.Publisher,
        this.Edition,
        this.PublishDate,
        this.BookNumber
      ]
    );
  }

  static IssueBook(BookNo, IssuedBy, IssudeDate) {
    db.execute(
      `INSERT INTO books_issued(BookNo, IssuedBy, IssueDate) VALUES (?, ?, ?)`,
      [BookNo, IssuedBy, IssudeDate]
    );
  }

  static FetchAll() {
    return db.execute("SELECT * FROM books;");
  }

  static FetchByID(id) {
    return db.execute("SELECT * FROM `books` WHERE BookNumber = ?", [id]);
  }

  static FetchAllBooKIssues() {
    return db.execute(
      `SELECT i.*, s.Fname,s.Mname,s.Lname, b.Title FROM student s, books_issued i, books b 
        WHERE s.StudID = i.IssuedBy AND b.BookNumber = i.BookNo`
    );
  }

  static FetchBooKIssuesByID(id) {
    return db.execute(
      `SELECT i.*, s.Fname,s.Mname,s.Lname, b.Title FROM student s, books_issued i, books b 
       WHERE s.StudID = i.IssuedBy AND b.BookNumber = i.BookNo AND i.BookNo = ?`,
      [id]
    );
  }

  static FetchBooKIssuesByStudent(IssuedBy) {
    return db.execute(
      `SELECT i.*, s.Fname,s.Mname,s.Lname, b.Title FROM student s, books_issued i, books b 
        WHERE s.StudID = i.IssuedBy AND b.BookNumber = i.BookNo AND s.StudID = ?`,
      [IssuedBy]
    );
  }

  //   Return Book Function Here
};
