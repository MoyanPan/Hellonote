import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import FolderCreation from "../components/foldercreate";
import NoteCreation from "../components/notecreate";
import Loading from "../components/spinner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../Contexts/SearchContext";

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchnotes, setSearchnotes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showall, setShowall] = useState(false);
  const [allnote, setAllnote] = useState(false);
  const [folderpage, setFolderpage] = useState("");
  const [noteJson, setNoteJson] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const { searchObj } = useContext(SearchContext);
  const obj = sessionStorage.getItem("userObj");
  const jsonObj = JSON.parse(obj);
  const navigate = useNavigate();
  const [fetch,setFetch] = useState(false);
  
  // when redirect to notepage, clear all noteobjId
  useEffect(()=>{
    console.log("process remove noteObj")
    sessionStorage.removeItem("noteobjId")
    sessionStorage.removeItem("title")
    sessionStorage.removeItem("folder")
    sessionStorage.removeItem("tempNote")
  },[])
 
  useEffect(() => {
    if (!obj) {
      alert("please login first");
      navigate("/login");
    }
  }, [navigate, obj]);
  
  useEffect(() => {
    if (obj && searchObj === "") {
      let userId = JSON.parse(sessionStorage.getItem("userObj"))._id;
      if (userId === undefined) {
        userId = JSON.parse(sessionStorage.getItem("userObj")).userId;
      }
      var config = {
        method: "get",
        url: "http://localhost:3001/service/notes",
        params: { user: userId },
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userObj")).token,
        },
      };
    }

    axios(config)
      .then(function (response) {
        let templist = [];
        templist.push(response.data);
        setNoteJson(response.data);
        setNotes(templist[0]);
        setLoading(false);
        setAllnote(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [fetch]);

  useEffect(() => {
    if (searchObj !== "") {
      let userId = JSON.parse(sessionStorage.getItem("userObj"))._id;
      if (userId === undefined) {
        userId = JSON.parse(sessionStorage.getItem("userObj")).userId;
      }

      var config = {
        method: "get",
        url: "http://localhost:3001/service/getNotebyName/?",
        params: { user: userId, notename: searchObj },
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userObj")).token,
        },
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          let templist = [];
          templist.push(response.data);
          setNotes(templist[0]);
          setLoading(false);
          setAllnote(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setFetch(!fetch);
    }
  }, [searchObj]);

  if (isLoading) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box style={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 2fr",
        }}
      >
        <Sidebar />
        <Box
          sx={{ margin: "0px" }}
          style={{
            backgroundColor: "white",
            marginBottom: ".5rem",
            marginLeft: ".5rem",
            marginRight: ".5rem",
          }}
        >
          <Header notejson={noteJson} threadvalue={searchObj} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Switch />
          </Box>

          {!allnote && folderpage === "" && searchObj === "" ? (
            <>
              {/* Folder components */}
              <FolderCreation
                notes={notes}
                folderpage={folderpage}
                setShowall={setShowall}
                showall={showall}
                setFolderpage={setFolderpage}
              />
            </>
          ) : null}

          {!showall || folderpage !== "" ? (
            <>
              <NoteCreation
                notes={notes}
                allnote={allnote}
                setAllnote={setAllnote}
                folderpage={folderpage}
                setFolderpage={setFolderpage}
                setFetch={setFetch}
                fetch={fetch}
              />
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default NotePage;
