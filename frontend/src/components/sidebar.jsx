import React from 'react'
import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import logoNoFrame from '../imgs/logoNoFrame.png';
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from "react-router-dom";

const sidebardata = [

    {
        title:"Home",
        icon: <HomeIcon sx={{ fontSize: 40 }}/>,
        link: "/home"
    },
    {
        title:"Note",
        icon: <CreateIcon sx={{ fontSize: 40 }}/>,
        link: "/Note"
    }
]

function Sidebar() {
    // const classes = useStyles();
    const { signOut, loaded } = useGoogleLogout({
       onFailure(){
           console.log("fffffffffff")
       },
       onLogoutSuccess(){
           console.log("ddddddddddd")
       },
       clientId:"969588223932-7bir4ult7auf3llq6bp4vmrfavta2nca.apps.googleusercontent.com",
      })
    const navigate = useNavigate();
return(
        <>

        <div className='sidebar' style={{minHeight:window.innerHeight}}>
            <div style = {{cursor:'pointer'}} id="logoWrapper" onClick={() => {navigate("/home");}}>
                <h1 className='logoText'>HELLO</h1>    
                <h1 className='logoText'>NOTE</h1>
                <img className='logocss' style={{ alignSelf: 'center' }} width='150' src={logoNoFrame}></img>
            </div>

            <ul className='sidebarList' >
                <div id="sideBarListWrapper">
                    <div id="homeAndNote">
                        {sidebardata.map((val, key) =>{
                            return(
                                <li 
                                key = {key}
                                className = "row"
                                onClick ={() => {window.location.pathname = val.link}}>
                                    <div className = "button" id= {val.title}>
                                        <div id = "icon">
                                            {val.icon}
                                        </div>
                                        <div id = "title" className = "logotext">
                                            {val.title}
                                        </div>
                                    </div>
                                </li>
                              )
                        })}
                    </div>

                    <div id="logoutAndSettings">
                        <li key = "40" className = "row" id="loginIcon" onClick ={() => {
                            signOut();
                            sessionStorage.removeItem("userObj");
                            sessionStorage.clear();
                            window.location.replace("http://localhost:3000/login");}}>
                            <div className = "button" id= {"Login"}>
                                <div id = "Login">
                                    {<LoginOutlinedIcon  sx={{ fontSize: 40 }}/>}
                                </div>
                                <div id = "title">
                                    {"Logout"}
                                </div>
                            </div>
                        </li>

                        <li key = "20" className = "row" id="settingsIcon" onClick ={() => {
                            window.location.pathname = "Setting"}}>
                            <div className = "button" id= {"Setting"}>
                                <div id = "Setting">
                                    {<SettingsOutlinedIcon  sx={{ fontSize: 40 }}/>}
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </ul>
        </div>
        </>
    )
} 

export default Sidebar;

