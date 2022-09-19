//********************************************************** TAKE NOTES ********************************************************//

//DEPENDENCIES --> PATH PACKAGE FOR HTML//
	const fs = require("fs");
	const uuid = require("../utils/uuid.js");
	const {
		editNote,
	} = require("../utils/fsUtil.js");

//ROUTES//
	module.exports = (app) => {

//GET NOTE//
	app.get("/api/notes", (req, res) => {
   
    fs.readFile("./db/db.json", "utf8", (err, data) => {
    	if (err) throw err;
      
    	res.json(JSON.parse(data));
    	});
  	});

//POST//
	app.post("/api/notes", (req, res) => {
    
    	const newNote = req.body;
    	fs.readFile("./db/db.json", "utf8", (err, data) => {
    		if (err) throw err;
      
    	const notesArr = JSON.parse(data);
    	newNote.id = uuid({ length: 10 });
    	notesArr.push(newNote);

    	editNote(notesArr);
    	console.log(
        `New Note Added! Title: ${JSON.stringify(
    	newNote.title
        )}, Text: ${JSON.stringify(newNote.text)}, ID: ${newNote.id} 🚀`
    	);

    	res.send(notesArr);
    	});
  	});

//DELETE NOTE//
	app.delete("/api/notes/:id", (req, res) => {
    	const deleteId = req.params.id;
    	fs.readFile("./db/db.json", "utf8", (err, data) => {
    		if (err) throw err;
      		let notesArr = JSON.parse(data);
      
      		for (let i = 0; i < notesArr.length; i++) {
        	if (notesArr[i].id === deleteId) {
          	notesArr.splice(i, 1);
        }
    }
    editNote(notesArr);
    	console.log(`Note Deleted! Note ID: ${deleteId} 🚀`);
    	res.send(notesArr);
    	});
	});

//PUT NOTE//
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

//LOCATE INDEX//
    let targetIndex = notesArr.indexOf(selectedNote);

//REPLACE W/ UPDATED NOTE//
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