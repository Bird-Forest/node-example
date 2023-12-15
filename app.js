const express = require("express");
// const moment = require("moment");
const logger = require("morgan");
// const fs = require("fs/promises");
const cors = require("cors");

// const books = require("./models/books/books.json");

const booksRouter = require("./routes/api/books"); // імпортуємо маршрути

const app = express(); // app - веб-сервер
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(cors()); // перехресні запити та передачі даних між  web-серверами
app.use(express.json()); // для обробки формату запитів та відповіді - веб-сервер, frontend
app.use("/api/books", booksRouter); // обробляє маршрути вказуємо endpoint - /api/books
app.use(logger(formatsLogger));

// app.get("/", (request, response) => {
//   // запит - веб-сервер
//   // response.send("<h1>Home page</h1>"); не вміє обробляти
//   response.json("<h1>Home page</h1>");
// });

// app.get("/contacts", (request, response) => {
//   console.log(request.url);
//   console.log(request.method);
//   response.send("<h1>Contacts page</h1>");
// });
// app.get("/products", (request, response) => {
//   // response.send(books);
//   response.json([]);
// });

// app.get("/books", (request, response) => {
//   const databaseResponse = null;
//   // res.json(databaseResponse);
//   // res.send(databaseResponse);
//   // response.send(books);
//   response.json(books);
// });

app.use((req, res) => {
  // функція спрацьовує коли відсутня сторінка
  res.status(404).json({ message: "Not found" });
});

// Загальна помилка серверу
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => console.log("Server running")); - перенесли в файл server

module.exports = app;
