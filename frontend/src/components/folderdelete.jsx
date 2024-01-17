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
  const handleClose = () => {
    props.setOpen(false);
  };

  const sendFolderDeleteRequest = () => {
    const us = JSON.parse(sessionStorage.getItem("userObj"))._id;
    var config = {
      method: "post",
      url: "http://localhost:3001/service/deletefolder",
      params: {user: us, foldername:props.foldername},
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
    props.setOpen(false);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle >Delete Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm you are deleting this folder including notes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color = "error" onClick={sendFolderDeleteRequest}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
