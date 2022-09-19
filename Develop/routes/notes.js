//********************************************************** TAKE NOTES ********************************************************//
//DEPENDENCIES --> PATH PACKAGE FOR HTML//
	const fs = require("fs");
	const uuid = require("../util/uuid");
	const editNote = (updatedNotesArray) => {
  	fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
    	if (err) throw err;
  		});
	};
//ROUTING//
	module.exports = (app) => {
//GET REQUEST//
  	app.get("/api/notes", (req, res) => {
//READ JSON & RETURN ALL PRIOR FILES//
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
//PASRE --> JSCRIPT STRING//
      res.json(JSON.parse(data));
    	});
  	});
//POST REQUEST//
  	app.post("/api/notes", (req, res) => {
//NEW NOTE --> JSON FILES//
    const newNote = req.body;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
//PARSE JSON DATA//
      const notesArr = JSON.parse(data);
      newNote.id = uuid
      notesArr.push(newNote);

      editNote(notesArr);
      console.log(
        `New Note Added! Title: ${JSON.stringify(
          newNote.title
        )}, Text: ${JSON.stringify(newNote.text)}, ID: ${newNote.id}`
      );

      res.send(notesArr);
    });
  });

//DELETE NOTES//
  	app.delete("/api/notes/:id", (req, res) => {
    const deleteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let notesArr = JSON.parse(data);
//DELETES NOTE BASED ON GEN. ID//
      for (let i = 0; i < notesArr.length; i++) {
        if (notesArr[i].id === deleteId) {
          notesArr.splice(i, 1);
        }
      }
      editNote(notesArr);
      console.log(`Note Deleted! Note ID: ${deleteId}`);
      res.send(notesArr);
    });
  });
//PUT NOTES//
  	app.put("/api/notes/:id", (req, res) => {
    const editId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      let notesArr = JSON.parse(data);

      let selectedNote = notesArr.find((note) => note.id === editId);
//CHECK//
      if (selectedNote) {
        let updatedNote = {
          title: req.body.title,
          text: req.body.text,
          id: selectedNote.id,
        };
//FIND INDEX//
        let targetIndex = notesArr.indexOf(selectedNote);
//REPLACE//
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