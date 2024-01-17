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

export default function FormFolderDialog(props) {
  const[folderName, setFolderName] = useState();
  const[helper, setHelper] = useState("");


  const handleClose = () => {
    props.setOpen(false);
  };

  const sendNameChangeRequest = () => {
    if (!folderName == ""){
      const us = JSON.parse(sessionStorage.getItem("userObj"))._id;
      var config = {
        method: "post",
        url: "http://localhost:3001/service/editfolder",
        params: {user: us, newname: folderName, oldname: props.folderOldName},
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
        <DialogTitle>Edit Folder Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your New Folder Name
          </DialogContentText>
          <TextField
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
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
