import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import axios from 'axios';

export default function FormNoteDialog(props) {
  const[noteName, setNoteName] = useState();
  const[helper, setHelper] = useState("");


  const handleClose = () => {
    props.setOpen(false);
  };

  const sendNameChangeRequest = () => {
    if (!noteName == ""){
      const us = JSON.parse(sessionStorage.getItem("userObj"))._id;
      var config = {
        method: "post",
        url: "http://localhost:3001/service/editnote",
        params: {user: us, folder : props.folder, newname: noteName, oldname: props.noteOldName},
        headers: { 
          'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("userObj")).token
        }
      };
      axios(config)
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
      setHelper("")
      props.setOpen(false);
      
    }else{
      setHelper("Incorrect entry.")
    }

  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Edit Note Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your New Note Name
          </DialogContentText>
          <TextField
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            helperText= {helper}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendNameChangeRequest}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
