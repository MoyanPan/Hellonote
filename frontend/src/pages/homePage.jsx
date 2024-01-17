import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
// import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import CalendarDisplay from "../components/calendar";
import Linechart from "../components/linechart";
import Showcard from "../components/showcard";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Logout from "@mui/icons-material/Logout";
import Switch from "@mui/material/Switch";
import Loading from "../components/spinner";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";

const HomePage = () => {
   // when redirect to homepage, clear all noteobjId
   useEffect(()=>{
    console.log("process remove noteObj")
    sessionStorage.removeItem("noteobjId")
    sessionStorage.removeItem("title")
    sessionStorage.removeItem("folder")
    sessionStorage.removeItem("tempNote")
  },[])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [data, setData] = useState([
    {
      name: "Sunday",
      notes: 0,
    },
    {
      name: "Monday",
      notes: 0,
    },
    {
      name: "Tuesday",
      notes: 0,
    },
    {
      name: "Wednesday",
      notes: 0,
    },
    {
      name: "Thursday",
      notes: 0,
    },
    {
      name: "Friday",
      notes: 0,
    },
    {
      name: "Saturday",
      notes: 0,
    },
  ]);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [numNoteM, setNumNoteM] = useState();
  const [numNoteCompare, setNumNoteCompare] = useState();
  const [numCode, setnumCode] = useState();
  const [mark, setMark] = useState();

  const { userObj } = useContext(LoginContext);

  // Add Note functions
  //   const [notetitle, setNoteTitle] = useState([]);
  //   const [foldername, setFsetNoteJsonolderName] = useState([]);
  const [noteJson, setNoteJson] = useState();

  // Helper function

  const lineChartPre = (notesObj) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayWeekday = today.getDay();

    // Get Start and End Date for this Week
    const weekStart = new Date(today.setDate(todayDate - todayWeekday));
    const weekEnd = new Date(today.setDate(todayDate + (6 - todayWeekday)));

    // filter this week's notes,[true, false] > give you true value
    // return list of accept the condition
    const filteredArray = notesObj.filter((noteElem) => {
      const createdAtDate = new Date(noteElem.createdAt);
      return createdAtDate >= weekStart && createdAtDate <= weekEnd;
    });

    // Map number of notes to data array
    // Loop through the list, pay attention on each list
    const test = data.map((charEle, charWeekday) => {
      // Caculate noteElem 'createAt' on which weekday
      const weekdayArray = filteredArray.filter((noteElem) => {
        // Note's created weekday
        const weekday = new Date(noteElem.createdAt).getDay();
        return charWeekday === weekday;
      });
      // return a object
      return {
        name: charEle.name,
        notes: weekdayArray.length,
      };
    });
    setData(test);
  };

  // Fetch all codes
  const fetchNote = (notsObj) => {
    const today = new Date();

    // 0-11 month + 1 => 1-12

    const todayMonth = today.getMonth() + 1;
    const filteredNoteByMonth = notsObj.filter((noteEle) => {
      const createdAtDate = new Date(noteEle.createdAt);
      return createdAtDate.getMonth() + 1 === todayMonth;
    });

    setNumNoteM(filteredNoteByMonth.length);

    const filteredNoteLastMonth = notsObj.filter((noteEle) => {
      const createdAtDate = new Date(noteEle.createdAt);
      return createdAtDate.getMonth() + 1 === todayMonth - 1;
    });
    // console.log("numNoteM", filteredNoteByMonth);
    const diffnote = filteredNoteByMonth.length - filteredNoteLastMonth.length;
    const absDiffnote = Math.abs(diffnote);
    setMark(diffnote);
    setNumNoteCompare(absDiffnote);
  };

  const getToday = () => {
    const today = new Date();
    // const todayDate = today.getDate();
    // const todayWeekday = today.getDay();

    // 0-11 month + 1 => 1-12
    const todayMonth = today.getMonth() + 1;
    const todayMonthName = toMonthName(todayMonth);
    setMonth(todayMonthName);
    const todayYear = today.getFullYear();
    setYear(todayYear);
  };

  const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    if (code && !sessionStorage.getItem("userObj")) {
      const getUserInfo = async () => {
        try {
          setLoading(true);
          console.log("process github login");
          // If user already registered
          const responseUserInfo = await axios.get(
            "http://localhost:3001/oauth-callback",
            { params: { code } }
          );
          sessionStorage.setItem(
            "userObj",
            JSON.stringify(responseUserInfo.data)
          );

          if (responseUserInfo.data.userExists === true) {
            // Get user's note detail
            console.log("github!!!");
            const user = responseUserInfo.data.userId;
            const responseGetNoteByUserId = await axios.get(
              "http://localhost:3001/service/notes",
              {
                params: { user },

                headers: {
                  Authorization: `Bearer ${responseUserInfo.data.token}`,
                },
              }
            );
            const numOfCode = await axios.get(
              "http://localhost:3001/service/code",
              {
                params: { user },
                headers: {
                  Authorization: `Bearer ${responseUserInfo.data.token}`,
                },
              }
            );
            console.log(numOfCode);
            setnumCode(numOfCode.data);
            setNoteJson(responseGetNoteByUserId.data);
            sessionStorage.setItem(
              "noteObj",
              JSON.stringify(responseGetNoteByUserId.data)
            );
            setUserInfo(responseUserInfo.data);
            setLoading(false);
            // Get note stats - linechart and other stats
            getToday();
            fetchNote(responseGetNoteByUserId.data);
            lineChartPre(responseGetNoteByUserId.data);
          } else {
            // User new to Hello Note, Just Redirect to
            const user = responseUserInfo.data.userId;
            const responseGetNoteByUserId = await axios.get(
              "http://localhost:3001/service/notes",
              {
                params: { user },

                headers: {
                  Authorization: `Bearer ${responseUserInfo.data.token}`,
                },
              }
            );
            setNoteJson(responseGetNoteByUserId.data);
            sessionStorage.setItem(
              "noteObj",
              JSON.stringify(responseGetNoteByUserId.data)
            );
            setUserInfo(responseUserInfo.data);
            const numOfCode = await axios.get(
              "http://localhost:3001/service/code",
              {
                params: { user },
                headers: {
                  Authorization: `Bearer ${responseUserInfo.data.token}`,
                },
              }
            );
            setnumCode(numOfCode.data);
            // Get Date now
            const today = new Date();
            const todayMonth = today.getMonth() + 1;
            const todayMonthName = toMonthName(todayMonth);
            setMonth(todayMonthName);
            const todayYear = today.getFullYear();
            setYear(todayYear);
            setLoading(false);
            fetchNote(responseGetNoteByUserId.data);
            lineChartPre(responseGetNoteByUserId.data);
          }
        } catch (error) {
          setLoading(false);
          console.log("error:", error);
          window.location.replace("http://localhost:3000/login");
          alert("Oops, Something wrong, Please login again.");
        }
      };
      getUserInfo();
    } else {
      console.log("hi");
      console.log(userObj);

      let user = 0;
      let userToken = "";

      if (!userObj) {
        const obj = sessionStorage.getItem("userObj");
        if (obj) {
          const jsonObj = JSON.parse(obj);
          console.log("refresh", jsonObj);
          setUserInfo(jsonObj);
          if (!jsonObj._id) {
            user = jsonObj.userId;
            userToken = jsonObj.token;
          } else {
            user = jsonObj._id;
            userToken = jsonObj.token;
          }
          console.log("userOOObj2222", user);
          console.log("TTOken", userToken);
        } else {
          console.log("you haven't login");
          window.location.replace("http://localhost:3000/login");
        }
      } else {
        // register new user and redirect to home page
        console.log("precess here-----");
        setUserInfo(userObj);
        user = userObj._id;
        userToken = userObj.token;
        console.log("userOOObj", user);
      }

      console.log("user", user);
      const getnumOfCode = async () => {
        const numOfCode = await axios.get(
          "http://localhost:3001/service/code",
          {
            params: { user },
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(numOfCode);
        setnumCode(numOfCode.data);
      };
      getnumOfCode();

      const getNotesbyUid = async () => {
        const responseGetNoteByUserId = await axios.get(
          "http://localhost:3001/service/notes",
          {
            params: { user },
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setNoteJson(responseGetNoteByUserId.data);
        sessionStorage.setItem(
          "noteObj",
          JSON.stringify(responseGetNoteByUserId.data)
        );
        getToday();
        console.log(responseGetNoteByUserId);
        fetchNote(responseGetNoteByUserId.data);
        lineChartPre(responseGetNoteByUserId.data);
      };
      getNotesbyUid();
      setLoading(false);
    }
  }, []);

  // Add Note function

  // return a Spinner when loading is true
  if (loading)
    return (
      <Box style={{ width: "100%" }}>
        <Loading />
      </Box>
    );

  return (
    <Box style={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 4fr",
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
          <Header notejson={noteJson} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#000000", fontWeight: "900", mb: "2%" }}
            >
              Dashboard
              <Typography component="span">
                {" "}
                Hello, {userInfo.userName}{" "}
              </Typography>
            </Typography>
            <Switch {...label} sx={{ ml: "20px" }} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gridTemplateRows: "1fr 1fr",
              gap: 5,
            }}
          >
            <Box
              sx={{
                display: "grid",
                border: 2,
                boxShadow: 1,
                borderRadius: 3,
              }}
            >
              <Linechart data={data} />
            </Box>

            <Box
              sx={{
                width: "300px",
                height: "300px",
                backgroundColor: "#A8C2F4",
                border: 2,
                boxShadow: 1,
                borderRadius: 3,
              }}
            >
              <Container sx={{ mt: 4 }}>
                <IconButton
                  size="large"
                  aria-label="display more actions"
                  edge="end"
                  color="inherit"
                  onClick={handleClick}
                  sx={{ ml: "90%" }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {/* <EditIcon/> */}
                </IconButton>
                {/* <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                            >
                                <MenuItem>
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                Edit
                                </MenuItem>
                                <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                                </MenuItem>
                            </Menu> */}

                <Typography variant="h6">{userInfo.userName}</Typography>
                <Typography sx={{ color: "#52525C" }}>
                  Computer Science
                </Typography>
                <Typography sx={{ mt: 3, color: "#52525C" }}>Email</Typography>
                <Typography>
                  {userInfo.userEmail ? userInfo.userEmail : userInfo.email}
                </Typography>
              </Container>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "1fr 1fr 1fr",
                // gridTemplateColumns: "3fr 1fr "
              }}
            >
              <Showcard
                month={month}
                year={year}
                notenum={numNoteM}
                sign={" "}
                title={"Total notes this month"}
              />
              <Showcard
                month={month}
                year={year}
                notenum={numNoteCompare}
                sign={mark === 0 ? " " : mark > 0 ? "↑" : "↓"}
                title={"Compare with last month"}
              />
              <Showcard
                month={month}
                year={year}
                notenum={numCode}
                title={"No. of Code"}
              />
            </Box>

            <Box
              sx={{
                width: "300px",
                height: "300px",
                border: 2,
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <CalendarDisplay />
              Don't waste your Time.
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
