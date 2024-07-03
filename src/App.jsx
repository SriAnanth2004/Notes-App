import React, { useState, useEffect } from "react";
import "./App.css";
import Notes from "./assets/Notes";
import Popup from "./assets/NewNotesWindow";
import {
  Button,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNotes = (note) => {
    const date = new Date().toLocaleString();
    setNotes([...notes, { ...note, date }]);
  };

  const updateNote = (updatedNote, index) => {
    const lastEdited = new Date().toLocaleString();
    const newNotes = notes.map((note, i) =>
      i === index ? { ...updatedNote, date: note.date, lastEdited } : note
    );
    setNotes(newNotes);
  };

  const confirmDeleteNote = (index) => {
    setNoteToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const deleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== noteToDelete);
    setNotes(newNotes);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="mainPage">
      <Container>
        <Grid
          container
          alignItems="center"
          textAlign={"center"}
          direction="column"
        >
          <h className="mainHead">My Notes</h>
          <button
            className="addNoteBtn"
            onClick={() => {
              setisPopupOpen(true);
              setCurrentNote(null);
            }}
          >
            Add new note
          </button>
          <Notes
            notes={notes}
            setNotes={setNotes}
            updateNote={updateNote}
            confirmDeleteNote={confirmDeleteNote}
          />
        </Grid>

        <Popup
          open={isPopupOpen}
          onClose={() => setisPopupOpen(false)}
          onSave={(note) => {
            if (currentNote) {
              updateNote(note, currentNote.index);
            } else {
              addNotes(note);
            }
            setisPopupOpen(false);
          }}
          note={currentNote}
        />

        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this note?
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={deleteNote}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default App;
