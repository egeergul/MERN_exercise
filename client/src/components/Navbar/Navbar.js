import React, { useState , useEffect} from "react";
import { AppBar, Button, Toolbar, Typography, Avatar} from "@material-ui/core";
import {Link, useHistory, useLocation} from "react-router-dom";
import useStyles from "./styles.js"; 
import decode from "jwt-decode";
import memoriesLogo from "../../images/memories-Logo.png"; 
import memoriesText from "../../images/memories-Text.png"; 
import { useDispatch } from "react-redux";
import dotenv from "dotenv";


dotenv.config();


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch(); 
    const history = useHistory(); 
    const location = useLocation();

    const logout =()=> {
        dispatch({type: "LOGOUT"});
        history.push("/auth");

        setUser(null);
    };

    useEffect(()=> {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp *1000 <new Date().getTime()) logout();
        }

        // JWT...
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location])

    

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/">
                <img src={memoriesText} alt="icon" height="45px" />
                <img src={memoriesLogo}  className={classes.image} alt="icon" height="40px" />
            </Link>

            <Toolbar className={classes.toolbar} >
                {
                    user? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt= {user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}  </Avatar>
                            <Typography  className={classes.userName}>{user.result.name} </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                        </div>
                    ) : (
                        <Button component= {Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )
                }

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
