//ROUTE PARAMETERS//
    const path = require("path");
    const express = require("express");
    const notesRouter = require("./notes");
    const app = express();
    app.use("/notes", notesRouter);

//EXPORT ROUTER --> MODULE//
    module.exports = (app) => {
//HTML GET REQUESTS//
    app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
//GET INDEX.HTML//
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    };