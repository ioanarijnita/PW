import { Button, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Header } from '../components/header';
import { FormControl } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import StoreDataService from "../services/users.service";
import { User } from '../models/user-model';
import { useLoginService } from '../hooks/login-hooks';

export function Registration(){
    const [user, setUser] = useState<User>({
        username: '',
        password: '',
        name: '',
        surname: '',
        region: '',
        address: ''
    })
    const [inputValidation, setInputValidation] = useState({
        username: false,
        password: false,
        name: false,
        surname: false,
        region: false,
        address: false
    });
   

    const history = useHistory();
    const {userData, setUserIndex, setUserData, userIndex} = useLoginService();

    async function createAccount () {
    if (user.username === "" || user.password === "" || user.name === "" || user.surname === "" || user.region === "" || user.address === "") 
    {
        setInputValidation({
            username: user.username === "" ? true : false, 
            password: user.password === "" ? true : false, 
            name: user.name === "" ? true : false, 
            surname: user.surname === "" ? true : false, 
            region: user.region === "" ? true : false, 
            address: user.address === "" ? true : false});
}
     else {
        await StoreDataService.create(user)
        .then( response => {
            console.log(response.data)
            user.isUserLoggedIn = true;
            // setUserData([user]);
            localStorage.setItem("User", JSON.stringify(user));
            setUserIndex(userData.length);
            
        })
        history.push("/");
    }
}

    return(
        <div>
            <br/>
            <Header></Header>
            <div style = {{display: 'flex', marginTop: 100, marginLeft: 40, textAlign: 'start'}}>
            <FormControl style = {{}}>
                <text style = {{fontSize: 20, fontWeight: 'bold'}}>Personal Details</text>
                <br/>
                <TextField 
                style = {{width: 180}} 
                onChange = {(e: any) => {
                    setUser({...user, username: e.target.value})
                    if (user.username !== ""){
                        setInputValidation({...inputValidation, username: false })
                    }
                }
                } 
                error = {inputValidation.username ? true : false} 
                value = {user.username} 
                id={inputValidation.username ? "outlined-error" : "standard-basic"} 
                label="USERNAME" 
                variant="standard" 
                InputLabelProps = {{style : {fontSize: 10}}} /> 
                <br/>
                <TextField 
                style = {{width: 180}}
                value = {user.password} 
                type = "password"
                onChange = {(e: any) => {
                    setUser({...user, password: e.target.value })
                    if(user.password !== ""){
                        setInputValidation ({...inputValidation, password: false})
                    }    
                }
            } 
                error = {inputValidation.password ? true : false} 
                id= {inputValidation.password ? "outlined-error" :"standard-basic"} 
                label="PASSWORD" 
                variant="standard" 
                InputLabelProps = {{style : {fontSize: 10}}} />
                <br/>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <TextField 
                    style = {{width: 180}} 
                    value = {user.name} 
                    onChange = {(e: any) => {
                        setUser ({...user, name: e.target.value});
                        if (user.name !== "") {
                            setInputValidation({...inputValidation, name: false})
                        }
                    }} 
                    error = {inputValidation.name ? true : false} 
                    id = { inputValidation.name ? "outlined-error" : "standard-basic" } 
                    label="NAME" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}/>
                    <br/>
                    <TextField 
                    style = {{width: 180, marginLeft: 100}} 
                    id = {inputValidation.surname ? "outlined-error" : "standard-basic"}
                    onChange = {(e: any) => {
                        setUser ({...user, surname: e.target.value})
                        if(user.surname !== ""){
                            setInputValidation ({...inputValidation, surname: false})
                        }
                    }
                    } 
                    label="SURNAME"
                    value = {user.surname}   
                    error = {inputValidation.surname ? true : false}
                    InputLabelProps = {{style : {fontSize: 10}}}/>
                </div>
                <br/>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <TextField 
                    style = {{width: 180}}  
                    value = {user.region} 
                    onChange = {(e: any) => {
                    
                        setUser ({...user, region: e.target.value})
                        if(user.region !== ""){
                            setInputValidation ({...inputValidation, region: false})
                        }
                    }
                } 
                    id= { inputValidation.region ?  "outlined-error" :"standard-basic"} 
                    error = {inputValidation.region ? true : false}
                    label="REGION" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}/>
                    <br/>
                    <TextField 
                    style = {{width: 180, marginLeft: 100}} 
                    value = {user.address} 
                    onChange = {(e: any) => {
                        setUser ({...user, address: e.target.value})
                        if(user.address !== ""){
                            setInputValidation({...inputValidation, address: false})
                        }
                    }
                } 
                    id= {inputValidation.address ? "outlined-error" : "standard-basic" } 
                    label="ADDRESS" 
                    variant="standard"
                    error = {inputValidation.address ? true : false} 
                    InputLabelProps = {{style : {fontSize: 10}}}/>
                </div>
                <br/><br/><br/><br/><br/>
                    <Button onClick = {createAccount} variant = "contained" style = {{backgroundColor: 'black', color: 'white', width: 250, fontSize: 12, height: 40}}>
                    CREATE ACCOUNT
                    </Button>
                
            </FormControl>

            </div>
        </div>
    );
}