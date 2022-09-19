//ROUTE//
    const express = require("express");
//CUSTOM MIDDLEWARE//
    const { custom } = require('../middleware/custom');
    const notesRouter = require("./notes");
    const app = express();

    app.use("/notes", notesRouter);
//INITIALIZE CUSTOM MIDDLEWARE//
    app.use(custom);

//EXPORT//
    module.exports = app;