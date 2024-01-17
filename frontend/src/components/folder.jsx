import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useState } from "react";
import FormFolderEditDialog from "./foldernameedit";
import FormFolderDeleteDialog from "./folderdelete";



const useStyles = makeStyles((theme) => ({
	card: {
		margin: "2em",
		marginTop:"3.5em",
		backgroundColor: "#4464A5 !important",
		borderRadius: "6% !important",
		width: "80%",
		height: "100%",
		filter: "drop-shadow(8px 10px 4px rgba(17, 40, 101, 0.51))",
	},
	title: {
		margin: "0.5em",
		textAlign: "center",
		color: "white",
		fontSize:18
	},
	container: {
		color: "white",
		paddingLeft: "1em",
		marginBottom: "0.5em",
		fontSize:17.25
	},
	containerItem: {
		color: "white",
	},
	divider: {
		height: "2px",
		backgroundColor: "white",
		// marginBottom: "55px"
		
	},
	movevert: {
		color: "white",
		marginBottom: "15px",
		marginRight: "-10px"
	},
	bottomitem:{
		marginTop:"30px",
	}
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

const Folder = ({ title, createTime,setFolderpage}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [folderEditPopup, setfolderEditPopup] = React.useState(false);
	const [folderDeletePopup, setfolderDeletePopup] = React.useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const editname = (title) =>{
		setfolderEditPopup(true)
		setAnchorEl(null);
	}

	const deletefolder = (title) =>{
		setfolderDeletePopup(true)
		setAnchorEl(null);
	}



	return (
		<Card className={classes.card}>
			<CardContent sx={{ p: "0px" }}>
				<div onClick={() => {setFolderpage(title);console.log(title);}} style={{ cursor: "pointer" }}>
					<Typography gutterBottom variant="h5" component="div">
						<Box className={classes.title}>{title}</Box>
					</Typography>
					<Box className={classes.divider}>
						<Divider />
					</Box>
				</div>
				<CardActions sx={{ paddingTop: "15px"}} disableSpacing className={classes.bottomitem}>
					<Typography gutterBottom color="text.secondary" >
						<Box className={classes.container}>
							Created At:{" "}
							<Box component="span" className={classes.containerItem} color="#FFFFFF">
								{createTime}
							</Box>
						</Box>
					</Typography>

					<ExpandMore>
						<IconButton aria-label="more" onClick={handleClick} aria-haspopup="true" aria-controls="long-menu">
							<MoreVertIcon fontSize="medium" className={classes.movevert} />
						</IconButton>
					</ExpandMore>

					<Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
						{/* {MyOptions.map((option) => (
							<MenuItem key={option} onClick={handleClose}>
								{option}
							</MenuItem>

						))} */}
						<MenuItem key={"Edit Folder Name"} onClick={() => editname(title)}>
							{"Edit Folder Name"}
						</MenuItem>
						<MenuItem key={"Delete Folder"} onClick={() => deletefolder(title)}>
							{"Delete Folder"}
						</MenuItem>

					</Menu>
				</CardActions>
			</CardContent>
			{/* {folderEditPopup ? <AlertFolderDialog open = {folderEditPopup} /> : null} */}
			<FormFolderEditDialog open={folderEditPopup} setOpen={setfolderEditPopup} folderOldName = {title} />
			<FormFolderDeleteDialog open={folderDeletePopup} setOpen={setfolderDeletePopup} foldername = {title} />
		</Card>

	);
};

export default Folder;
