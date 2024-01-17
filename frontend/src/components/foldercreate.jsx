import Folder from "./folder";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const FolderCreation = (props) => {
  let count = 0;
  let data = [props.notes];
  let folderlist = [];
  let folderNameList = [];
  while (data[0][count]) {
    if (folderlist.indexOf(data[0][count].folder === false)) {
      console.log(data[0][count].folder);
      if (
        (folderNameList.includes(data[0][count].folder) === false) &
        (data[0][count].folder !== "") &
        (data[0][count].folder !== undefined)
      ) {
        let templist = [];
        let date = data[0][count].createdAt;
        date = date.split("-");
        templist.push(data[0][count].folder);
        templist.push(date[2].slice(0, 2) + "/" + date[1] + "/" + date[0]);
        folderlist.push(templist);
        folderNameList.push(data[0][count].folder);
      }
      count++;
    }
  }

  folderlist =
    props.showall || props.folderpage !== ""
      ? folderlist
      : folderlist.slice(0, 6);
  return (
    <>
      {/* Folder title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          borderRadius: 1,
          marginTop: "-40px",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#000000", fontWeight: "900", mb: "2%" }}
          marginLeft="60px"
          marginTop="-10px"
        >
          FOLDERS
        </Typography>
        <Box sx={{ marginTop: "-10px", marginRight: "160px" }}>
          <Button onClick={() => props.setShowall(!props.showall)}>
            {props.showall ? "VIEW LESS" : "VIEW ALL"}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "337.5px 337.5px 337.5px",
          gridTemplateRows: "151.875px 151.875px 151.875px",
          marginTop: "-60px",
          marginLeft: "60px",
          marginBottom: "-100px",
        }}
      >
        {/* Folder component */}
        {folderlist.map((x) => (
          <Folder
            title={x[0]}
            createTime={x[1]}
            key={x[2]}
            setFolderpage={props.setFolderpage}
          />
        ))}
      </Box>
    </>
  );
};

export default FolderCreation;
