import React, { useState, useContext, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import Header from"../components/header"
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { NoteContext } from "../Contexts/NoteContext";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Loading from "../components/spinner";
import CardActions from '@mui/material/CardActions';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const CodePage = () => {
  const [noteJson, setNoteJson] = useState();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();
  const [input, setInput] = useState("");
  const [lang, setLang] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setNoteObj } = useContext(NoteContext);
  const navigate = useNavigate();
  const location = useLocation();
 try{
  if (location.state.result) {location.state.result.map((code) => (
    console.log("code:",code[0])
  ))}}
  catch{
    location.state={input:'', type:'', result:[]}};
  
  return (
    <>
      <Box style={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 2fr",
          }}
        >
          <Sidebar style={{minHeight:window.innerHeight}}/>
          <Box sx={{ margin: "0px" }} style={{backgroundColor: 'white', marginBottom: '.5rem', marginLeft: '.5rem', marginRight: '.5rem'}}>
            <Header />
               <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                borderRadius: 1,
                }}
                > 
                </Box>
                {location.state.result?location.state.result.map(code => (
                  
                <Card sx={{ minWidth: 275 }} style={{backgroundColor: 'white', marginBottom: '.5rem', marginLeft: '.5rem', marginRight: '.5rem'}}>
                <CardContent style={{backgroundColor: 'black'}}>
                  <Typography sx={{ fontSize: 14 }} color="white" gutterBottom >
                    Code Content
                  </Typography>
                  <Typography variant="body2" color="white" style={{backgroundColor: 'gray'}}>
                    {code[0].content}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="white" gutterBottom >
                    Input: {code[0].input}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                    Output
                  </Typography>
                  <Typography variant="body2" color="white" style={{backgroundColor: 'gray'}}>
                    {code[0].output}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  {code[0].note?<Button size="small" onClick={() => {
                  setNoteObj({ 'title':'', 'foldername':'', 'id':code[0].note });
                  navigate("/addnote");
                  }}>Go to Note</Button>:''}
                </CardActions> */}
              </Card>
              )):<Typography>No Result</Typography>}
            </Box>
        </Box>
      </Box>
    </>
  );
  //};
};
export default CodePage;
