import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {Link, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useState, useContext } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from 'axios';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { CardContent } from "@mui/material";
import FolderCreation from "./foldercreate";
import { SearchContext } from "../Contexts/SearchContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Header = ({ notejson,threadvalue = "" }) => {
  // Control popup window shows and hide
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [search, setSearch] = useState(false);
  const [output, setOutput] = useState();
  const handleSearch = () => setSearch(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState();
  const [folder, setFolder] = useState();
  const [selecteditem, SetSelect] = useState();
  //Search bar input value
  const {searchObj,setSearchObj } = useContext(SearchContext);
  const [searchcontent, setSearchcontent] = useState(threadvalue)
  const navigate = useNavigate();

  const onTitleChange = (e) => setTitle(e.target.value);
  const onFolderChange = (e) => setFolder(e.target.value);
  const handleChange = (e) => {
    SetSelect(e.target.value);
  };

  const onSubmit = (e) => {
    console.log("press save");
    console.log(notejson);
    e.preventDefault();
    let flag = 0
    if (notejson) {
      notejson.forEach((element) => {
        if (title === element.title || title === "") {
          console.log("1")
          flag = 1
          setTitle("");
          alert("note title must be unique and cannot be empty");
        }
        if (folder === element.folder && folder !== undefined) {
          console.log("1")
          flag = 1
          setFolder("")
          alert("note folder must be unique");
        }
        if(flag === 1){
          window.location.reload()
        }
      });
    }
    if(title !== "" && flag === 0){
      const tempNote = {
        title: title,
        text: "",
        folder: selecteditem ? selecteditem : folder,
        user: "",
      };
      setTitle("");
      setFolder("");
      console.log(tempNote);
      sessionStorage.setItem("tempNote", JSON.stringify(tempNote));
  
      window.location.replace("http://localhost:3000/addnote");
    }
    
  };
  // Header
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const [searchInput, setSearchInput] = React.useState("");
  const [searchType, setSearchType] = React.useState("");
  const getUserInfo  = async() => {
    const us = JSON.parse(sessionStorage.getItem("userObj"))._id;
    var config = {
      method: "get",
      url: searchcontent?`http://localhost:3001/service/code/${searchcontent}`:`http://localhost:3001/service/code/does1not2exist3at4all5`,
      params: { user: us },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("userObj")).token,
      },
    };
    axios(config)
      .then(function (response) {
        let templist = [];
        console.log("response:",response.data)
        response.data.map(code=>{templist.push([code])});
        navigate('/code',{state:{input:searchcontent, type:searchType, result:templist}});
      })
      .catch(function (error) {
        console.log(error);
      });
    setSearch(false);
  }
  //const navigate = useNavigate();
  const toComponentB=()=>{
    //search && searchType === 'codeName') {
      getUserInfo();
      
    //}
  }
  
  const handleSearchChange = (event) => {
    setSearchType(event.target.value);
  };
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My profile</MenuItem>
    </Menu>
  );
  const valueSubmit = e => {
    if(e.code == "Enter" || e.code == "NumpadEnter"){
      setSearchObj(searchcontent);
      if(window.location.href != "http://localhost:3000/Note"){
        navigate("/Note");
      }
    }
  };

  return (
    <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
      <AppBar position="static" style={{ background: "#FFFFFF" }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              value={searchcontent}
              onChange={
                e => setSearchcontent(e.target.value)}
              onKeyDown = {valueSubmit}
              placeholder={"Search..."}
              inputProps={{ "aria-label": "search" }}
              //onChange={handleSearchInputChange}
              
            />
            <Button style={{float: 'right'}} onClick={()=>{toComponentB()}}>Search Output</Button>
          </Search>
          <Box sx={{ display: "inline-flex" }}>
            {/* <IconButton
              size="large"
              aria-label="create new notes folder"
              color="default"
            >
              <CreateNewFolderIcon />
            </IconButton> */}
            <IconButton
              size="large"
              aria-label="create new note"
              color="default"
              onClick={handleOpen}
            >
              <NoteAddIcon />
            </IconButton>

            {open ? (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography component="div" variant="subtitle">
                    Create Note
                  </Typography>
                  <Grid item xs={12} sx={{ m: 1 }}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        label="Note Title"
                        name="title"
                        autoComplete="title"
                        value={title}
                        onChange={onTitleChange}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Select Folder
                      </InputLabel>
                      <Select
                        sx={{ m: 1, width: 300 }}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        input={<OutlinedInput label="Folder" />}
                        value={notejson ? selecteditem : ""}
                        onChange={handleChange}
                      >
                        {notejson
                          ? [...new Set(notejson.map(f=>f.folder))].map((folder) => (
                              <MenuItem
                                key={folder}
                                value={folder}
                              >
                                {folder}
                              </MenuItem>
                            ))
                          : ""}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ m: 2, width: 300 }}>
                      <TextField
                        fullWidth
                        id="folder"
                        label="Create Folder"
                        name="folder"
                        autoComplete="folder"
                        value={folder}
                        onChange={onFolderChange}
                      />
                    </FormControl>
                  </Grid>
                  <Box sx={{ ml: 17 }}>
                    <Button onClick={onSubmit}>Save</Button>
                  </Box>
                </Box>
              </Modal>
            ) : null}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="default"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Header;
