import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import FormNoteEditDialog from "./notenameedit";
import FormNoteDeleteDialog from "./notedelete";
import axios from "axios";
import { useContext } from "react";
import { NoteContext } from "../Contexts/NoteContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2em",
    marginTop: "3.5em",
    backgroundColor: "#A8C2F4",
    borderRadius: "6%",
    width: "80%",
    height: "100%",
    filter: "drop-shadow(8px 10px 4px rgba(17, 40, 101, 0.51))",
    paddingBottom: "0px",
  },
  cardContent: {
    paddingBottom: "0 !important",
  },
  title: {
    margin: "0.5em",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  subTitle: {
    fontWeight: "bold",
    paddingLeft: "1em",
    color: "white",
  },
  container: {
    color: "white",
    fontSize: 15,
    paddingLeft: "1em",
  },
  containerItem: {
    fontSize: 15,
    color: "white",
  },
  divider: {
    height: "2px",
    backgroundColor: "white",
  },
  movevert: {
    color: "white",
  },
  heart: {
    paddingLeft: "0.2em",
    color: "white",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Note = ({
  title,
  subTitle,
  fav,
  createdate,
  foldername,
  id,
  modifiedDate
}) => {
  const classes = useStyles();
  const { setNoteObj } = useContext(NoteContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [noteEditPopup, setNoteEditPopup] = React.useState(false);
  const [noteDeletePopup, setNoteDeletePopup] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editname = (title) => {
    setNoteEditPopup(true);
    setAnchorEl(null);
  };

  const deletenote = (title) => {
    setNoteDeletePopup(true);
    setAnchorEl(null);
  };

  const FavIcon = () => {
    if (fav) {
      return (
        <IconButton aria-label="add to favorites" onClick={() => changeFav()}>
          <FavoriteIcon fontSize="medium" className={classes.heart} />
        </IconButton>
      );
    } else {
      return (
        <IconButton aria-label="add to favorites" onClick={() => changeFav()}>
          <FavoriteBorderIcon fontSize="medium" className={classes.heart} />
        </IconButton>
      );
    }
  };
  const changeFav = () => {
    const us = JSON.parse(sessionStorage.getItem("userObj"))._id;
    var config = {
      method: "post",
      url: "http://localhost:3001/service/changeFav",
      params: {
        user: us,
        foldername: foldername,
        notename: title,
        faviorite: fav,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("userObj")).token,
      },
    };
    axios(config)
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent} sx={{ p: "0px" }}>
          <div
            onClick={() => {
              setNoteObj({ title, foldername, id });
              navigate("/addnote");
            }}
            style={{ cursor: "pointer" }}
          >
            <Typography gutterBottom component="div">
              <Box className={classes.title}>{title}</Box>
            </Typography>
          </div>
          <Box className={classes.divider}>
            <Divider />
          </Box>

          <Typography gutterBottom variant="subtitle1" component="div">
            <Box className={classes.subTitle}>{subTitle}</Box>
          </Typography>

          <Typography gutterBottom color="text.secondary">
            <Box className={classes.container}>
              Created At:{" "}
              <Box
                component="span"
                className={classes.containerItem}
                color="primary.main"
              >
                {modifiedDate}
              </Box>
            </Box>
            <Box className={classes.container}>
              Modified date:{" "}
              <Box
                component="span"
                className={classes.containerItem}
                color="primary.main"
              >
                {createdate}
              </Box>
            </Box>
          </Typography>
        </CardContent>

        <CardActions sx={{ p: "0px" }} disableSpacing>
          {FavIcon()}

          <ExpandMore>
            <IconButton
              aria-label="more"
              onClick={handleClick}
              aria-haspopup="true"
              aria-controls="long-menu"
            >
              <MoreVertIcon fontSize="medium" className={classes.movevert} />
            </IconButton>
          </ExpandMore>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            onClose={handleClose}
            open={open}
          >
            {/* {MyOptions.map((option) => (
							<MenuItem key={option} onClick={handleClose}>
								{option}
							</MenuItem>
						))} */}
            <MenuItem key={"Edit Note Name"} onClick={() => editname(title)}>
              {"Edit Note Name"}
            </MenuItem>
            <MenuItem key={"Delete Note"} onClick={() => deletenote(title)}>
              {"Delete Note"}
            </MenuItem>
            <MenuItem
              key={"Export As PDF"}
              onClick={() => console.log("havent done it yet")}
            >
              {"Export As PDF"}
            </MenuItem>
          </Menu>
        </CardActions>
        <FormNoteEditDialog
          open={noteEditPopup}
          setOpen={setNoteEditPopup}
          noteOldName={title}
          folder={foldername}
        />
        <FormNoteDeleteDialog
          open={noteDeletePopup}
          setOpen={setNoteDeletePopup}
          notename={title}
          folder={foldername}
        />
      </Card>
    </>
  );
};

export default Note;
