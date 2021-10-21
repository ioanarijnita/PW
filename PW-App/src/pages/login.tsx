import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header } from '../components/header';
import { useLoginService } from '../hooks/login-hooks';
import { User } from '../models/user-model';
import StoreDataService from "../services/users.service";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from '@mui/material/Alert';
import { Footer } from '../components/Footer';
export function Login(){
    const history = useHistory();
   const [userLogged, setUserLogged] = useState({
       username: "",
       password:"",
       userId: ""
   })

   const [adminAccount] = useState({
       username: "admin",
       password: "admin"
   })
   const { getUsers, userData, setUserObj, setUserIndex, userObj } = useLoginService();
   useEffect(() => {
       getUsers()
   }, [])

   const [showAlert, setShowAlert] = useState(false);

   function handleLogIn(){
    const userId = userData.filter(item => item.username === userLogged.username).map(item => item.id).pop();
    StoreDataService.login({...userLogged, userId: String(userId)})
    .then(res => {
        setUserObj(res.data)
        localStorage.setItem("User", JSON.stringify(res.data));
        if (res.data.id !== undefined && res.data.username !== 'admin') {
            history.push("/")
        } else if (res.data.id !== undefined && res.data.username === 'admin') {
            history.push("/adminproductlist")
        }
        else {
            setShowAlert(true);
        }
        
    }
)
   }

   function AlertShowing() {
       return (
        <Alert variant="outlined" onClose={() => setShowAlert(false)} severity="error">Invalid credentials!</Alert>
       );
   }

    return (
      <div>
        <br/>
        <Header></Header>
        <div style = {{display: 'flex'}}>
            <text style ={{fontWeight: 'bold', fontSize: 25, marginLeft: 100, marginTop: 140}}>Login</text>
            <text style = {{fontWeight: 'bold', fontSize: 25, marginLeft: 380, marginTop: 140 }}>Register</text>
            <div style = {{display: 'flex', flexDirection: 'column', top: 210, position: 'absolute', left: 100}}>
        
                <TextField   
                        id="standard-textarea"
                        label = "USERNAME"
                        multiline
                        variant="standard"
                        style = {{width: 200, height: 10, fontSize: 10, }}
                        value = {userLogged.username}
                        onChange = {(e: any) => setUserLogged({...userLogged, username: e.target.value})}
                        InputLabelProps = {{style : {fontSize: 10}}}
                    />
                    <br /> <br /> <br />
                    <TextField   
                        id="standard-basic"
                        type = "password"
                        label = "PASSWORD"
                        variant="standard"
                        style = {{width: 200,  height: 10, fontSize: 10}}
                        value = {userLogged.password}
                        onChange = {(e: any) => setUserLogged({...userLogged, password: e.target.value})}
                        InputLabelProps = {{style : {fontSize: 10}}}
                    />
                    <br/><br/><br/><br/>

                    <Button onClick = {handleLogIn} variant = "contained" style = {{backgroundColor: 'black', color: 'white', fontSize: 12, height: 40, width: 200}}>LOG IN</Button>
                    <br />
                    <div>
                        {showAlert ? <AlertShowing></AlertShowing> :<></> }
                    </div>
                 </div>
                <div style = {{position: 'absolute', top: 210, marginLeft: 550, marginRight: 270, fontSize: 12, display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
                    <p style = {{fontSize: 12}}>IF YOU STILL DON'T HAVE AN ACCOUNT, USE THIS OPTION TO ACCESS THE REGISTRATION FORM.</p>
                    <br />
                    <p style = {{}}> BY GIVING US YOUR DETAILS, PURCHASING IN OUR ONLINE STORE WILL BE FASTER AND AN ENJOYABLE EXPERIENCE.</p>
                    <br/><br/><br/>
                    <Button variant = "contained" style = {{backgroundColor: 'black', color: 'white', top: 50, width: 250, fontSize: 12, height: 40}}>
                        <Link style = {{textDecoration: 'none', color: 'white'}} to = '/registration'>CREATE ACCOUNT</Link>
                    </Button>
                 </div>
             
                 
                 </div>
                 <div style = {{marginTop: 299}}>
                    <Footer />
                </div>
      </div>
    );
}