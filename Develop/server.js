const express = require("express");
const path = require("path");
const app = express();
const { custom } = require('./middleware/custom');
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));
//ROUTERS//
require("./routes/notes.js")(app);
require("./routes/index.js")(app);
//LISTENER//
app.listen(PORT, () =>
  console.log(`Express server currently running on port: ${PORT}`)
);