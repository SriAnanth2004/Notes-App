import React, { useEffect, useState } from "react";
import "../App.css";
import {
  Button,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Popup = ({ onClose, onSave, note, open }) => {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (note) {
      setInput(note.input || "");
      setDescription(note.description || "");
    } else {
      setInput("");
      setDescription("");
    }
  }, [note, open]);

  const handleSave = () => {
    onSave({ input, description });
  };

  return (
    <Dialog
      PaperProps={{
        style: { backgroundColor: "#a66ec9", color: "#fff" },
        sx: { height: 410 },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogActions>
        <button className="Exit_button" onClick={onClose}>
          X
        </button>
      </DialogActions>
      <DialogTitle fontSize={35}>New Note</DialogTitle>
      <DialogContent style={{ scrollbarWidth: "none" }}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item container marginTop={1}>
            <TextField
              inputProps={{ style: { fontSize: 25, color: "#fff" } }}
              InputLabelProps={{ style: { fontSize: 25, color: "#fff" } }}
              variant="outlined"
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              label="Title"
              spellCheck="false"
              fullWidth
            />
          </Grid>

          <Grid item>
            <TextField
              inputProps={{ style: { fontSize: 20, color: "#fff" } }}
              InputLabelProps={{ style: { fontSize: 20, color: "#fff" } }}
              variant="outlined"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              spellCheck="false"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
