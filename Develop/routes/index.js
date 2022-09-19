//ROUTE//
    const path = require("path");

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