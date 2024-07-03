import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Notes = ({ notes, confirmDeleteNote, updateNote }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNote, setEditedNote] = useState({
    input: "",
    description: "",
    date: "",
    lastEdited: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleEdit = () => {
    setEditingIndex(selectedIndex);
    setEditedNote({ ...notes[selectedIndex] });
    handleClose();
  };

  const handleDelete = () => {
    confirmDeleteNote(selectedIndex);
    handleClose();
  };

  const handleSave = (index) => {
    updateNote(editedNote, index);
    setEditingIndex(null);
  };

  const handleExit = () => {
    setEditingIndex(null);
  };

  const handleTextareaChange = (field, value) => {
    setEditedNote({
      ...editedNote,
      [field]: value,
    });
  };

  return (
    <Grid container justifyContent="flex-start" alignItems="flex-start">
      {notes.map((note, index) => (
        <Grid
          className="notesWindow"
          container
          boxShadow={9}
          sx={{
            margin: 2,
            height: 410,
            width: 350,
          }}
          key={index}
        >
          <Grid
            container
            marginTop={2}
            marginLeft={2}
            marginRight={2}
            direction={"column"}
            textAlign={"left"}
          >
            <Typography>Title</Typography>
            <textarea
              className="inputHolder"
              value={editingIndex === index ? editedNote.input : note.input}
              onChange={(e) => handleTextareaChange("input", e.target.value)}
              disabled={editingIndex !== index}
              rows="1"
              cols="30"
              spellCheck="false"
            ></textarea>
          </Grid>

          <Grid
            container
            marginBottom={2}
            marginLeft={2}
            marginRight={2}
            direction={"column"}
            textAlign={"left"}
          >
            <Typography>Description</Typography>
            <textarea
              className="descriptionHolder"
              value={
                editingIndex === index
                  ? editedNote.description
                  : note.description
              }
              onChange={(e) =>
                handleTextareaChange("description", e.target.value)
              }
              disabled={editingIndex !== index}
              rows="8"
              cols="30"
              spellCheck="false"
            ></textarea>
          </Grid>

          <Grid
            container
            marginBottom={2}
            marginLeft={2}
            marginRight={2}
            direction={"column"}
            textAlign={"left"}
          >
            <Typography>Date Created: {note.date}</Typography>
            <Typography>Last Edited: {note.lastEdited}</Typography>
          </Grid>

          {editingIndex !== index ? (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding={2}
            >
              <Button
                id={`basic-button-${index}`}
                aria-controls={
                  open && selectedIndex === index ? "basic-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={
                  open && selectedIndex === index ? "true" : undefined
                }
                onClick={(e) => handleClick(e, index)}
                style={{ color: "#fff" }}
              >
                <MenuIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open && selectedIndex === index}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": `basic-button-${index}`,
                }}
              >
                <MenuItem onClick={handleEdit}>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <DeleteIcon /> Delete
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              padding={2}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSave(index)}
              >
                Save
              </Button>
              <Button variant="contained" color="error" onClick={handleExit}>
                Exit
              </Button>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Notes;
