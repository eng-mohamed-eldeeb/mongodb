const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const { json, urlencoded } = require("body-parser");
const app = express();

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  bondy: {
    type: String,
    minLighth: 10,
  },
});

const Note = mongoose.model("note", noteSchema);

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/note", async (req, res) => {
  const notes = await Note.find({}).exec();
  res.status(200).json(notes);
});

app.post("/note", async (req, res) => {
  const noteToCreate = req.body;
  const note = await Note.create(noteToCreate);
  res.status(201).json(note);
});

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever");
};

connect()
  .then(async () => {
    app.listen(5000, () => console.log("server on 5000"));
  })
  .catch((err) => console.log(err));
