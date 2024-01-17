import React, { useState, useContext, useEffect } from "react";
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

const AddNotePage = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();
  const [input, setInput] = useState("");
  const [savedInput, setSavedInput] = useState("");
  const [lang, setLang] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [codeContend, setCodeContend] = useState();
  const [output, setOutput] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("");
  const [newCreatedNoteId,setNewCreatedNoteId] = useState()
  const { userObj } = useContext(LoginContext);
  const [tempNote, setTempNote] = useState();
  const { noteObj } = useContext(NoteContext);
  const navigate = useNavigate();

  // from note page - has noteId
  useEffect(() => {
    console.log("line42", noteObj)
    const getexistNote = async () => {
      if (noteObj) {
        // first time from note page
        sessionStorage.setItem("noteobjId", noteObj.id)
        console.log(noteObj.id);
        const existNote = await axios.get(
          `http://localhost:3001/service/note/${noteObj.id}`,
          config
        );
        console.log("line51",existNote.data.text)
        setValue(existNote.data.text);
        // sessionStorage.removeItem("tempNote")
      }else{
        // refreshing
        const noteId = sessionStorage.getItem("noteobjId")
        if(noteId){
          console.log("line60",noteId  )
          const existNote = await axios.get(
            `http://localhost:3001/service/note/${noteId}`,
            config
          );
          console.log(existNote.data.text);
          setValue(existNote.data.text);
        }
        // sessionStorage.removeItem("noteobjId")
      }
    };
    getexistNote();
  }, []);

  // Get user ID
  const obj = sessionStorage.getItem("userObj");

  const jsonObj = JSON.parse(obj);
  console.log(jsonObj);
  let config = {
    headers: {
      Authorization: "Bearer " + jsonObj.token,
    },
  };

  // create new Note -> tempNote obj
  // const tempNoteObj = sessionStorage.getItem("tempNote");
  

  // 为了显示addnote title，folder
  useEffect(() => {
    // create new Note -> tempNote obj
    const tempNoteObj = sessionStorage.getItem("tempNote");

    // from notepage
    if (noteObj) {
      console.log("line90", noteObj)
      //   setFolder(noteObj.foldername);
      sessionStorage.setItem("folder", noteObj.foldername);
      sessionStorage.setItem("title", noteObj.title);
      // setTitle(noteObj.title);
    } else if (tempNoteObj) {
      // from header
      console.log("line100")
      const jsonNoteObj = JSON.parse(tempNoteObj);
      sessionStorage.setItem(
        "folder",
        jsonNoteObj.folder ? jsonNoteObj.folder : ""
      );
      sessionStorage.setItem("title", jsonNoteObj.title);
    } else{
      // from home and refreshing noteObj == undefined and temNoteObj is undefined
      console.log("line110")
      setFolder(sessionStorage.getItem("folder"))
      setTitle(sessionStorage.getItem("title"))

    }
  }, []);
  
//  const jsonNoteObj = JSON.parse(tempNoteObj);
//  useEffect(() => {
//     const getexistNote = async () => {
//       const existNote = await axios.get(
//         `http://localhost:3001/service/note/${noteObj.id}`,
//         config
//       );
//       setValue(existNote.data.text);
//       console.log(existNote);
//     };
//     getexistNote();
//   }, []);

  const onInputChange = (e) => setInput(e.target.value);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '30%',
    bgcolor: "white",
    p: 2,
  };

  useEffect(() => {
    if (!obj) {
      alert("please login first");
      navigate("/login");
    } else {
      setUserInfo(jsonObj._id);
      console.log(userInfo);
    }
  }, [navigate, obj]);

  useEffect(() => {
    const tempNoteObj = sessionStorage.getItem("tempNote");
    const jsonNoteObj = JSON.parse(tempNoteObj);
    if (noteObj) {
      setTempNote(noteObj);
      setFolder(noteObj.foldername);
      setTitle(noteObj.title);
    } else if (jsonNoteObj) {
      // const tempNote = {
      //   title: title,
      //   text: "",
      //   folder: "",
      //   user: "",
      // };
      // setTempNote(jsonNoteObj);
      setFolder(jsonNoteObj.folder);
      setTitle(jsonNoteObj.title);
      // sessionStorage.setItem("tempNote", JSON.stringify(tempNote));
    }
  }, []);

  //const folder = sessionStorage.getItem("folder");
  //const title = sessionStorage.getItem("title");

  // Code compiler
  const sendItToTheMoon = async () => {
    console.log("cc", codeContend);
    console.log("lang", lang);

    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "fb3f4ce779msh009de5ea20ccaedp173ee8jsn5be0db7364c5",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: codeContend,
          language_id: lang,
          stdin: input,
        }),
      }
    );
    const jsonResponse = await response.json();
    console.log("token", jsonResponse.token);

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "fb3f4ce779msh009de5ea20ccaedp173ee8jsn5be0db7364c5",
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
        console.log("jsonResult", jsonGetSolution);
      }
    }

    if (jsonGetSolution.stdout) {
      const output = jsonGetSolution.stdout;
      setOutput(output);
    } else if (jsonGetSolution.stderr) {
      const error = jsonGetSolution.stderr;
      setOutput(error);
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      setOutput(compilation_error);
    }

    setOpen(false);
    setSavedInput(input);
    setInput("");
  };

  // Save note
  const onClick = async(type) => {
    if (userInfo !== null) {
      if (title !== null) {
        const createdNote = await axios.post(
          "http://localhost:3001/service/note",
          {
            text: value,
            title: title,
            folder: folder,
          },
          config
        );
        console.log("line253",createdNote)
        setNewCreatedNoteId(createdNote.data._id)
        if (type === 'code') {
          handleSaveCode();
        }
        else {
          alert(`note successfully Saved`);
        }
      } else {
        alert("Please enter a title");
      }
    } else {
      alert("Please login first");
      navigate("/login");
    }
  };
  const handleSaveCode = async() => {
    let config = {
      headers: {
        Authorization: "Bearer " + jsonObj.token,
      },
    };
    if (userInfo !== null) {
      //onClick("code");
      if (codeContend !== null) {
        try {
          await axios.post(
            "http://localhost:3001/service/code",
            {
              content: codeContend,
              output: output,
              input: savedInput,
              userId: userInfo,
              noteId: tempNote ? tempNote.id : newCreatedNoteId,
            },
            config
          );
          alert(`code successfully Saved`);
        } catch (error) {
          if (error.response.status === 500) {
            alert("Please save the new note before sending it");
          } else {
            alert("code unsuccessfully Saved");
          }
        }
        //alert("code successfully Saved");
      } else {
        alert("Please enter the code");
      }
    } else {
      alert("Please login first");
      navigate("/login");
    }
  };

  return (
    <>
      <Box style={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 2fr",
          }}
        >
          <Sidebar />

          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#B4B4B4" }}>
              <Toolbar>
                <Typography fontSize="21px" marginRight="400px">
                  Folder {folder}
                </Typography>
                <Typography fontSize="21px">Title {title}</Typography>
              </Toolbar>
            </AppBar>
            <Editor
              tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/5.10.4-130/tinymce.min.js"
              apiKey="v2aygu2hc93l4cspzxd164kl1573e0qmof82pvncypliuxw5"
              // onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(newValue, editor) => setValue(newValue)}
              //initialValue={value}
              value={value}
              // initialValue="Please Start your Note"
              init={{
                extended_valid_elements: "pre[class=myclass]]",
                height: 500,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "codesample",
                  "codesample code",
                ],
                codesample_languages: [
                  { text: "Python", value: "python" },
                  { text: "JavaScript", value: "javascript" },
                  { text: "Java", value: "java" },
                  { text: "C", value: "c" },
                  { text: "C#", value: "csharp" },
                  { text: "C++", value: "cpp" },
                  { text: "Swift", value: "swift" },
                  { text: "Ruby", value: "ruby" },
                  { text: "Kotlin", value: "kotlin" },
                  { text: "TypeScript", value: "typescript" },
                  { text: "SQL", value: "sql" },
                  { text: "Go", value: "go" },
                  { text: "Assembly", value: "assembly" },
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | codesample | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                codesample_global_prismjs: true,
                selector: "textarea",
                init_instance_callback: function (editor) {
                  let superNumber = 0;
                  editor.on("ExecCommand", function (e) {
                    if (e.command === "mceFocus")
                      console.log("The " + e.command + " command was fired.");
                    const code =
                      window.tinymce.activeEditor.selection.getContent();

                    console.log(code);

                    if (code) {
                      const start = code.indexOf("language") + 9;
                      const end = code.indexOf(">") - 1;
                      let lang = code.substring(start, end);
                      const lang_transfer = {
                        python: 71,
                        javascript: 63,
                        java: 62,
                        c: 75,
                        csharp: 51,
                        cpp: 76,
                        ruby: 72,
                        swift: 83,
                        kotlin: 78,
                        typescript: 74,
                        sql: 82,
                        go: 60,
                        assembly: 45,
                      };
                      console.log("lang", lang);
                      if (lang in lang_transfer) {
                        lang = lang_transfer[lang];
                        console.log("langtransfer", lang);
                      }
                      setLang(lang);
                      const codecontentstart = code.indexOf("<code>") + 6;
                      const codecontentend = code.indexOf("</code>");
                      const codecontent = code.substring(
                        codecontentstart,
                        codecontentend
                      );
                      console.log(codecontent);
                      setCodeContend(codecontent);

                      let node =
                        window.tinymce.activeEditor.selection.getNode();
                      console.log("node", node);
                      superNumber = superNumber + 1;
                      node.setAttribute("index", superNumber);
                    }
                  });
                },
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {open && lang ? (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                          <FormControl sx={{ m: 1, width: '100%' }}>
                            <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                              Enter input:
                            </Typography>
                              <textarea
                                fullWidth
                                placeholder="start a new line for a new input"
                                id="textarea"
                                label="Enter Input"
                                name="textarea"
                                autoComplete="textarea"
                                value={input}
                                onChange={onInputChange}
                                //style="height:100px;"
                                style={{height: "75px",resize:"none"}}
                              />
                          </FormControl>
                        <Box sx={{ ml: 17 }}>
                          <Button onClick={sendItToTheMoon}>Run</Button>
                        </Box>
                      </Box>
                    </Modal>
                  ) : null}
                </Grid>
                {lang ? (
                  <Grid item xs={16}>
                    <Card>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Output:
                        </Typography>

                        <Typography
                          variant="body2"
                          style={{ wordWrap: "break-word" }}
                        >
                          {output}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : null}
                <Grid item xs={12} align="center">
                  {lang ? (
                    <Button variant="outlined" onClick={handleOpen}>
                      Run
                    </Button>
                  ) : null}
                  {lang ? (
                    <Button
                      variant="outlined"
                      sx={{ ml: 2 }}
                      onClick={()=>onClick('code')}
                    >
                      Save this code
                    </Button>
                  ) : null}
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    size="large"
                    onClick={()=>onClick('note')}
                  >
                    Save Note
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
  //};
};
export default AddNotePage;
