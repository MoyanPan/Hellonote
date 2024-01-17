import Note from "./note";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { SearchContext } from "../Contexts/SearchContext";
// notelist = !props.allnote ? notelist.slice(0, 3) : notelist;

const notefilter = (notelist, id) => {
	const templist = [];
	for (let x in notelist) {
		if (notelist[x][2] == id) {
			templist.push(notelist[x]);
		}
	}
	return templist;
};


const NoteCreation = (props) => {
	const {searchObj} = useContext(SearchContext);
	let count = 0;
	let data = [props.notes];
	let notelist = [];
	while (data[0][count]) {
		let templist = [];
		let date = data[0][count].modifiedAt;
		let createdate = data[0][count].createdAt;
		date = date.split("-");
		createdate = createdate.split("-");
		templist.push(data[0][count].title);
		templist.push(date[2].slice(3, 11).split(":").reverse().join(":") + ":" + date[2].slice(0, 2) + ":" + date[1] + ":" + date[0]);
		templist.push(data[0][count].folder);
		templist.push(data[0][count].favourite);
		templist.push(data[0][count]._id);
		templist.push(createdate[2].slice(3, 11).split(":").reverse().join(":") + ":" + createdate[2].slice(0, 2) + ":" + createdate[1] + ":" + createdate[0]);
		notelist.push(templist);
		count++;
	}
	notelist
		.sort(function (a, b) {
			let num = 0;
			let first = a[1].split(":").reverse();
			let second = b[1].split(":").reverse();
			return new Date(first[0], first[1], first[2], first[3], first[4], first[5]) - new Date(second[0], second[1], second[2], second[3], second[4], second[5]);
		})
		.reverse();
	const newnotelist = props.allnote ? notelist : !props.allnote && !(props.folderpage === "") ? notefilter(notelist, props.folderpage) : notelist.slice(0, 3);
	const notelength = newnotelist.length <= 3 ? "151.875px" : "151.875px 151.875px 151.875px";
	return (
		<>
			{props.folderpage === "" ? (
				<>
					{/* RECENTLY VIEWED NOTES */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							bgcolor: "background.paper",
							borderRadius: 1,
							marginTop: "-50px",
							marginBottom: "10px",
						}}
					>
						<Typography variant="h5" sx={{ color: "#000000", fontWeight: "900", mb: "2%" }} marginLeft="60px">
							{searchObj == "" ? "RECENTLY VIEWED NOTES" : "Result"}
						</Typography>
						<Box sx={{ marginRight: "160px" }}>
							<Button onClick={() => {
									props.setAllnote(!props.allnote)
							}}>{props.allnote ? "VIEW LESS" : "VIEW ALL"}</Button>
						</Box>
					</Box>
				</>
			) : (
				<>
				<Typography variant="h5" sx={{ color: "#000000", fontWeight: "900", mb: "2%" }} marginLeft="60px" marginTop="-50px">
					FOLDERS
				</Typography>
				<Box sx={{display : "flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
					<IconButton sx={{marginRight: "50px"}}>
						<KeyboardReturnIcon  sx={{ fontSize: 35 }} onClick ={() => {props.setFolderpage("")}}/>
					</IconButton>
				</Box>
				<Typography variant="h5" sx={{ color: "#000000", fontWeight: "900", mb: "2%" }} marginLeft="60px" marginTop="-50px">
					{props.folderpage}
				</Typography>
				</>
			)}
			{/* Notes components */}
			<Box
				sx={{
					display: "grid",
					gap: 3,
					gridTemplateColumns: "337.5px 337.5px 337.5px",
					gridTemplateRows: notelength,
					marginTop: "-55px",
					marginLeft: "60px",
				}}
			>
				{newnotelist.map((x) => (
					<Note title={x[0]} modifiedDate={x[1].slice(-10)} foldername = {x[2]} fav = {x[3]} id = {x[4]} createdate={x[5].slice(-10)} />
				))}
			</Box>
		</>
	);
};

export default NoteCreation;