//************************************************** J$CRIPT SOURCE-CODE ****************************************************//
  let noteTitle;
  let noteText;
  let saveNoteBtn;
  let newNoteBtn;
  let noteList;
  let noteDate;

//DATE & TIME//
  const now = new Date();
  const input = document.querySelector("input");
  input.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 19);

  if (window.location.pathname === "/notes") {
    noteTitle = document.querySelector(".note-title");
    noteText = document.querySelector(".note-textarea");
    saveNoteBtn = document.querySelector("#save");
    newNoteBtn = document.querySelector("#new");
    noteList = document.querySelectorAll(".list-container .list-group");
    noteDate = document.querySelector("#publishDate");
  }

//SHOW ELEMENT//
  const show = (elem) => {
    elem.style.display = "inline";
  };

//HIDE ELEMENT//
  const hide = (elem) => {
    elem.style.display = "none";
  };

//TRACK ACTIVE NOTE VIA TEXT-AREA//
  let activeNote = {};

//GET NOTES FROM DB.JSON FILES//
  const getNotes = () =>
    fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
//POST NOTES TO DB.JSON FILES//
  const saveNote = (note) =>
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

//DELETE NOTES//
  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

//EDIT NOTES//
  const editNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

//RENDER EMPTY INPUTS W/OUT ACTIVE NOTE//
  const renderActiveNote = () => {
    hide(saveNoteBtn);

    if (activeNote.id) {
//***************************GREEN-OUT TO ENABLE EDITING STORED NOTES ******************************//
    // [noteTitle.setAttribute("readonly", true);]  --> CANCEL GREEN-OUT TO DISABLE TITLE EDITING//
    // [noteText.setAttribute("readonly", false);]  --> CANCEL GREEN-OUT TO DISABLE BODY TEXT EDITING//
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
    noteDate.value = activeNote.date;
    } else {
    noteTitle.value = "";
    noteText.value = "";
    noteDate.value = "";
    }
  };

//GET NOTE DATA FROM INPUT --> DB.JSON FILES//
  const handleNoteSave = () => {
//NEW NOTE//
    const newNote = {
    title: noteTitle.value,
    text: noteText.value,
    date: noteDate.value,
    };

    console.log(
      `SUCCESS! NEW NOTE ADDED! Title: ${JSON.stringify(
        newNote.title 
      )}, Text: ${JSON.stringify(newNote.text)}`,
    );
//SAVE NEW NOTE//
    saveNote(newNote).then(() => alert(`SUCCESS❕✅ NEW NOTE '${newNote.title}' ADDED❕✅`))
    .then(() => {
    getAndRenderNotes();
    renderActiveNote();
    });
  };

//EDIT CLICKED NOTE//
  const handleNoteEdit = (event) => {
//PREVENTS LISTENER CALLED FROM INSIDE//
    event.stopPropagation();
    handleNoteView();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  if (activeNote.id === noteId) {
    activeNote = {
      title: noteTitle.value.trim(),
      text: noteText.value.trim(),
      date: noteDate.value.trim(),
    };
  }

    editNote(noteId).then(() => {saveNote(activeNote)
    });
    deleteNote(noteId).then(() => alert(`WARNING❗⛔ NOTE EDITED❗✍`))
    .then(() => {
    getAndRenderNotes();
    renderActiveNote();
    });
  };

//DELETE CLICKED NOTE//
  const handleNoteDelete = (event) => {
//BLOCK LISTENER//
  event.stopPropagation();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;
  console.log(`WARNING! NOTE DELETED! ID: ${noteId}`);

  if (activeNote.id === noteId) {
    activeNote = {};
  }

      deleteNote(noteId).then(() => alert(`WARNING❗⛔ NOTE DELETED❗❌`))
      .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

//DISPLAYS ACTIVE NOTE//
  const handleNoteView = (event) => {
    activeNote = JSON.parse(event.target.parentElement.getAttribute("data-note"));
    renderActiveNote();
  };

//SETS ACTIVE NOTE TO ALLOW USER ENTER A NEW NOTE//
  const handleNewNoteView = () => {
    activeNote = {};
    renderActiveNote();
  };

//HIDE SAVE BUTTON UNLESS NEW NOTE ENTERED (TITLE+BODY)//
  const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
      hide(saveNoteBtn);
      } else {
      show(saveNoteBtn);
    }
  };

//RENDER LIST NOTE-TITLES//
  const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();

      if (window.location.pathname === "/notes") {
        noteList.forEach((el) => (el.innerHTML = ""));
      }

  let noteListItems = [];

//RETURNS HTML ELEMENT W/ OR W/OUT DELETE BUTTON//
    const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    liEl.append(spanEl);
//DELETE BTN ATTRIBUTES//
    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add(
        "fa-solid",
        "fa-ban",
        "float-right",
        "delete-note"
      );

      delBtnEl.addEventListener("click", handleNoteDelete);

			liEl.append(delBtnEl);
		  }

		return liEl;
	  };

    if (jsonNotes.length === 0) {
    noteListItems.push(createLi("NO SAVED NOTES!", false));
    }

    jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
    });

    if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note));
    }
    console.log(jsonNotes);
    };

//GETS NOTES FROM DB.JSON & RENDERS --> LIST//
  const getAndRenderNotes = () => getNotes().then(renderNoteList);

    if (window.location.pathname === "/notes") {
      saveNoteBtn.addEventListener("click", handleNoteSave);
      newNoteBtn.addEventListener("click", handleNewNoteView);
      noteTitle.addEventListener("keyup", handleRenderSaveBtn);
      noteText.addEventListener("keyup", handleRenderSaveBtn);
    }

//GETS INITIAL LIST//
  getAndRenderNotes();
  