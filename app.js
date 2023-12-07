const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const books = require("./models/books/books.json");

const booksRouter = require("./routes/api/books");

const app = express();

// const corsMiddleware = cors();
// app.use(corsMiddleware);
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//   await fs.appendFile("./pablic/server.log", `\n${method} ${url} ${date}`);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Next");
//   next();
// });

app.get("/", (request, response) => {
  response.send("<h1>Home page</h1>");
});

// app.get("/contacts", (request, response) => {
//   console.log(request.url);
//   console.log(request.method);
//   response.send("<h1>Contacts page</h1>");
// });
app.get("/products", (request, response) => {
  // response.send(books);
  response.json([]);
});

// app.get("/books", (request, response) => {
//   const databaseResponse = null;
//   // res.json(databaseResponse);
//   // res.send(databaseResponse);
//   // response.send(books);
//   response.json(books);
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => console.log("Server running"));
