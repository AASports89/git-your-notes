//********************************************************** TAKE NOTES ********************************************************//

//DEPENDENCIES --> PATH FOR HTML//
  const fs = require("fs");
  const uuid = require("../public/assets/js/utils/uuid");

//EDIT NOTES//
  const editNote = (updatedNotesArray) => {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
    if (err) throw err;
    });
  };
  
  
//******************************** ROUTING ********************************//
  module.exports = (app) => {
//GET ROUTE//
  app.get("/api/notes", (req, res) => {
//READ DB.JSON FILES//
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
//PARSE JSON STRING --> JSCRIPT//
      res.json(JSON.parse(data));
      });
    });

//POST REQUEST//
  app.post("/api/notes", (req, res) => {
//NEW NOTE --> RETURNS//
    const newNote = req.body;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
//PARSE JSON STRING --> JSCRIPT//
      const notesArr = JSON.parse(data);
      newNote.id = uuid({ length: 10 });
      notesArr.push(newNote);
//ADD NOTE --> EXISTING LIST//
      editNote(notesArr);
        console.log(
        `SUCCESS! NEW NOTE ADDED!
          Title: ${JSON.stringify(newNote.title)} 🚀, 
          Text: ${JSON.stringify(newNote.text)} 🚀,
          Date: ${JSON.stringify(newNote.date)} 🚀,
          ID: ${newNote.id} 🚀`
        );
        res.send(notesArr);
        });
      });
      
//DELETE REQUEST//
  app.delete("/api/notes/:id", (req, res) => {
    const deleteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let notesArr = JSON.parse(data);
//RANDOM GEN. ID CHECK//
      for (let i = 0; i < notesArr.length; i++) {
        if (notesArr[i].id === deleteId) {
          notesArr.splice(i, 1);
        }
      }
      editNote(notesArr);
      console.log(`WARNING! NOTE DELETED! ID: ${deleteId} 🚀`);
      res.send(notesArr);
    });
  });

//PUT REQUEST//
  app.put("/api/notes/:id", (req, res) => {
    const editId = req.params.id;
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
          let notesArr = JSON.parse(data);
              let selectedNote = notesArr.find((note) => note.id === editId);

//CHECK NOTE//
  if (selectedNote) {
    let updatedNote = {
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        id: selectedNote.id,
        };
        let targetIndex = notesArr.indexOf(selectedNote);
          notesArr.splice(targetIndex, 1, updatedNote);
            res.sendStatus(204);
            editNote(notesArr);
              res.json(notesArr);
                } else {
                res.sendStatus(404);
                }
              });
          });
  };