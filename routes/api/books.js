const express = require("express");

// файл з якого експортуються маршрути
const router = express.Router();

const ctrl = require("../../controllers/books");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/books");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schema), ctrl.add);

router.put("/:id", validateBody(schema), ctrl.updateById);

router.delete("/:id", ctrl.deleteById);

module.exports = router;

// app.get("/api/books", (req, res) => {
//   res.json(books);
// });
// app.get("/api/books/:id", (req, res) => {
//   res.json(books[0]);
// });
// app.post("/api/books", (req, res) => {
//   res.json(books[0]);
// });
// app.put("/api/books/:id", (req, res) => {
//   res.json(books[0]);
// });
// app.delete("/api/books/:id", (req, res) => {
//   res.json(books[0]);
// });
