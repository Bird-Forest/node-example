const express = require("express");
const Joi = require("joi");

const books = require("../../models/books");
const { HttpError } = require("../../helpers");

// const app = express();
const router = express.Router();

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  // res.json(books);
  try {
    const result = await books.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.getById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error);
    }
    const result = await books.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error);
    }
    const { id } = req.params;
    const result = await books.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.deleteById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ result, message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

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
