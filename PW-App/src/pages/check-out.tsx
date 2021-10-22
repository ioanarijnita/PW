import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createNonNullExpression } from 'typescript';
import { Footer } from '../components/Footer';
import { Header } from '../components/header';
import { useCartService } from '../hooks/cart-hooks';
import { useLoginService } from '../hooks/login-hooks';
import { useProductService } from '../hooks/product-hook';
import { User } from '../models/user-model';
import { Women } from '../models/women-model';


export function CheckOut(){

    const { getUsers, userData, userObj, setUserObj, userIndex } = useLoginService();
    const { bagItems, setBagItems, setTotalAmmount, setRerenderTotal, rerenderTotal } = useCartService();
    const { womenData, updateWomenById, getWomenById, womenDataById } = useProductService();
    const history = useHistory();
    useEffect(() => {
        getUsers()
    }, [])
    
    const [userLoggedIn, setUserLoggedIn] = useState({
        name: "",
        surname: "",
        region: "",
        address: "",
        // isLogged: false
    });
    const [isClicked, setIsClicked] = useState<boolean>();

    useEffect(() => {
        const userStorage = localStorage.getItem("User");
        if (userStorage !== null) {
            const parsedUser = JSON.parse(userStorage!)
            setUserLoggedIn({name: parsedUser.name,
                surname: parsedUser.surname,
                region: parsedUser.region,
                address: parsedUser.address
        })
        } else {
            setUserLoggedIn({name: "", "surname": "", region: "", address: ""})
        }
    }, [userData])

    async function checkoutOnClick() {
        const sizeIndexesArray = bagItems.map(item => item.sizeIndex);
        if (sizeIndexesArray.some(item => item === undefined)) {
            setIsClicked(false);
            return;
        } else {
            setIsClicked(true);
            const arrayOfNumberOfProducts = bagItems.map(item => item.noProducts.split(","))
            // split: 1,2,3,4,5 => [1,2,3,4,5]
    
            for (let i=0; i < arrayOfNumberOfProducts.length; i++) {
            let newNumberOfProducts = "";    
                for (let j=0; j < 5; j++) {
                    if (bagItems[i].sizeIndex === j) {
                        // variabila in string: `${variabila}`
                        newNumberOfProducts = newNumberOfProducts + `${parseInt(arrayOfNumberOfProducts[i][j]) - bagItems[i].productsAdded!}`
                    } else {
                        newNumberOfProducts = newNumberOfProducts + `${arrayOfNumberOfProducts[i][j]}`
                    }
                    if (j !== 4) {
                        newNumberOfProducts = newNumberOfProducts + `,`;
                    }
                }
                updateWomenById(bagItems[i].id!, {
                    ...bagItems[i],
                    noProducts: newNumberOfProducts
                })
                setBagItems([]);
                localStorage.removeItem("bag");
            }
            history.push("/")
            localStorage.setItem("total", String(0));
            setTotalAmmount(0);
            setRerenderTotal(!rerenderTotal);
        }
        
    }
    return(

    <div>
        <br/>
        <div style = {{display: 'flex'}}>
         <Header title = "CHECK OUT"></Header>

         <div style = {{display: 'flex', flexDirection: 'column', marginTop: 135, marginLeft: 155}}>
              <TextField   
                        id="standard-textarea"
                        label = "FIRST NAME"
                        multiline
                        variant="standard"
                        style = {{width: 200, height: 10, fontSize: 10, }}
                        value = {userLoggedIn.name}
                        onChange = {(e: any) => setUserLoggedIn({...userLoggedIn, name: e.target.value})}
                        InputLabelProps = {{style : {fontSize: 10}}}
                />
                <br /> <br /> <br />
              <TextField   
                        id="standard-textarea"
                        label = "SURNAME"
                        multiline
                        variant="standard"
                        style = {{width: 200, height: 10, fontSize: 10, }}
                        value = {userLoggedIn.surname}
                        onChange = {(e: any) => setUserLoggedIn({...userLoggedIn, surname: e.target.value})}
                        InputLabelProps = {{style : {fontSize: 10}}}
                />
                <br /> <br /> <br />

               <TextField   
                        id="standard-textarea"
                        label = "REGION"
                        multiline
                        variant="standard"
                        style = {{width: 200, height: 10, fontSize: 10, }}
                        value = {userLoggedIn.region}
                        onChange = {(e: any) => setUserLoggedIn({...userLoggedIn, region: e.target.value})}
                        InputLabelProps = {{style : {fontSize: 10}}}
                />
                <br /> <br /> <br />
               <TextField   
                        id="standard-textarea"
                        label = "ADDRESS"
                        multiline
                        variant="standard"
                        style = {{width: 200, height: 10, fontSize: 10, }}
                        value = {userLoggedIn.address}
                        onChange = {(e: any) => setUserLoggedIn({...userLoggedIn, address: e.target.value})}
                        InputLabelProps = {{style : {fontSize: 10}}}
                />
                 <br /> <br /> <br /> <br /> <br /> <br />
                 <Button style = {{color: 'black', backgroundColor: 'green'}} variant = "outlined" onClick = {checkoutOnClick}>CHECK OUT</Button>
                 {
                     isClicked ? <text>Success!</text> : isClicked === false ?  <text>Please provide a size for each of your clothing items</text> : <></>
                 }
            </div>
            </div>
            <Footer />

    </div>
    );
}