const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const acc = req.body.username;
  const pw = req.body.password;
  if (acc && pw) {
    if (isValid(acc)) {
      users.push({ username: acc, password: pw });
      return res.status(200).json({ message: "Successfully registered." });
    } else {
      return res.status(404).json({ message: "User already registered." });
    }
  }
  return res.status(404).json({ message: "Unable to register." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});
//Task 10
public_users.get("/books", function (req, res) {
  const func10 = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books, null, 4)));
  });
  func10.then(() => console.log("Task 10 is solved."));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null, 4));
});
//Task 11
public_users.get("books/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  await new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books[isbn], null, 4)));
  });
  console.log("Task 11 is finished.");
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let result = Object.values(books).filter((books) => {
    return books.author == author;
  });
  res.send(JSON.stringify(result, null, 4));
});
//Task 12
public_users.get("books/author/:author", function (req, res) {
  const author = req.params.author;
  const func12 = new Promise((resolve, reject) => {
    let result = Object.values(books).filter((books) => {
      return books.author == author;
    });
    resolve(res.send(JSON.stringify(result, null, 4)));
  });
  console.log("Task 12 completed.");
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let result = Object.values(books).filter((books) => {
    return books.title === title;
  });
  res.send(JSON.stringify(result, null, 4));
});

//Task 13
public_users.get("books/title/:title", function (req, res) {
  const title = req.params.title;
  const func13 = new Promise((resolve, reject) => {
    let result = Object.values(books).filter((books) => {
      return books.title == title;
    });
    resolve(JSON.stringify(result, null, 4));
  });
  console.log("Task 13 completed.");
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let result = books[isbn];
  res.send(JSON.stringify(result["reviews"], null, 4));
});

module.exports.general = public_users;
