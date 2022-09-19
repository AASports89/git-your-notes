const express = require("express");
const notesRouter = require("./take");
const app = express();

app.use("/take", notesRouter);

module.exports = app;