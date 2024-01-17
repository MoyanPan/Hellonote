import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

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

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    title: "",
    folder: "",
  });

  const { title, folder } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Validation: Check note title unique
  // Folder: Make dropdown + Create new Folder  -> fetch all notes get their folder

  //   const onSubmit = (e) => {
  //     e.preventDefault();

  //     const userData = {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //     };
  //     console.log(userData);
  //     axios
  //       .post("http://localhost:3001/auth/register", userData)
  //       .then((res) => {
  //         console.log(res.data);
  //         setUserObj(res.data);
  //         sessionStorage.setItem("userObj", JSON.stringify(res.data));
  //         const status = res.status;

  //         if (status === 201) {
  //           navigate("/home");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("register failed.");
  //         console.log(error);
  //         if (error.response.status === 409) {
  //           alert(`User already exists. Please Login in.`);
  //         } else if (error.response.status === 400) {
  //           alert(`Please fill all the fields.`);
  //         }
  //         setFormData({
  //           firstName: "",
  //           lastName: "",
  //           email: "",
  //           password: "",
  //         });
  //       });
  //   };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Add New Note</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              required
              fullWidth
              id="title"
              label="Note Title"
              name="title"
              autoComplete="title"
              value={title}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="folder"
              label="Folder"
              name="folder"
              value={folder}
              autoComplete="folder"
              onChange={onChange}
            />
          </Grid>
          <Button> Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
