import { Select, Button } from '@material-ui/core';
import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CurrencySelection, GenderSelection } from '../App';
import './styles.scss';
import {Modal} from './modal-cart';
import RoomIcon from '@material-ui/icons/Room';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import { ModalFilter } from './modal-filter';
import { useEffectAsync, useLoginService } from '../hooks/login-hooks';
import { User } from '../models/user-model';
import { useProductService } from '../hooks/product-hook';
import { Women } from '../models/women-model';


export function Header(p:{title?: string, register?: string}){
    const { gender, setGender} = useContext(GenderSelection);
    const { currency, setCurrency } = useContext(CurrencySelection);
    const [showFilterOrBag, setShowFilterOrBag] = useState({
        showFilter: false,
        showBag: false
    })
    const history = useHistory();
    const [parsedUser, setParsedUser] = useState<User>();
    const {userData, userIndex, setUserData} = useLoginService();
    const { womenData, soldOut, searchInput, setSearchInput, setSearchResults, setWomenData } = useProductService();

    useEffect(() => {
        const results = womenData.filter((item, index) => item.name.toLowerCase().includes(searchInput?.toLowerCase()!));
        setSearchResults(results);
    }, [searchInput])

    useEffect(() => {
        const user =  localStorage.getItem("User")
        if (user !== null) {
            setParsedUser(JSON.parse(user));
            // setUserData(JSON.parse(user));
        }
    }, [])

    const closeModalHandlerBag = () => setShowFilterOrBag(
        {
            showFilter: false,
            showBag: false
        }
    );

    const closeModalHandlerFilter = () => {
        setShowFilterOrBag({
            showFilter: false,
            showBag: false
        });
        const priceFilter = localStorage.getItem("priceFilter")
        const filteredSize = localStorage.getItem("filteredSize")
        const filterByName = localStorage.getItem("filterByName")
        
       if (filteredSize !== null) {
        const filteredArraySize = JSON.parse(filteredSize)
        setWomenData([...filteredArraySize]);
        }
        else if (priceFilter !== null) {
            const priceFilterArray = JSON.parse(priceFilter);
            const minimumFiltered = priceFilterArray[0];
            const maximumFiltered = priceFilterArray[1];
            const filtered = womenData.filter(item => minimumFiltered <= parseInt(item.price) && parseInt(item.price) <= maximumFiltered)
            setWomenData([...filtered]);
        }

        else if (filterByName !== null) {
            const filteredByNameArray = JSON.parse(filterByName)
            setWomenData(filteredByNameArray);
        }
        localStorage.removeItem("priceFilter");
        localStorage.removeItem("filteredSize");
        localStorage.removeItem("filterByName");
    }

    useEffect(() => {

    }, [closeModalHandlerFilter])
    
    function handleOnClickLoggIN(){
        if (userData[userIndex].isUserLoggedIn === false) {
            history.push("/login")
        } else {
            userData[userIndex].isUserLoggedIn = false;
            setUserData([...userData])
            localStorage.removeItem("User");
    }
    }
    
    return(
              <div>
                <div className ="buttons">
                <Button variant ="text" onClick = {() => {
                }} >
                    <Link style = {{color: 'black', textDecoration: 'none'} } to = {'/'}>Home</Link>
                </Button>
                <Button variant ="text" onClick = {() => {
                    if (gender === 0) {
                        setGender(null);
                    } else {
                        setGender(0);
                    }
                }} >
                    <Link style = {gender === 0 ? {color: 'red', textDecoration: 'none'} : {textDecoration: 'none', color: 'black'}} to = {'/women'}>Women</Link>
                </Button>
                <Button variant = "text" onClick = {() => {
                    if (gender === 1) {
                        setGender(null);
                    } else {
                        setGender(1);
                    }
                }}>
                    <Link style = {gender === 1 ? {color: 'blue', textDecoration: 'none'} : {textDecoration: 'none', color: 'black'}}  to = {'/men'}>Men</Link>
                </Button>
                <Button variant = "text" onClick = {() => {
                    if (gender === 2) {
                        setGender(null);
                    } else {
                        setGender(2);
                    }
                }} >
                    <Link style = {gender === 2 ? {color: 'orange', textDecoration: 'none'} : {textDecoration: 'none', color: 'black'}}  to = {'/kids'}>Kids</Link>
                </Button>
                <TextField   
                       id="standard-textarea"
                    //    label="Multiline Placeholder"
                       placeholder="Search"
                       value = {searchInput}
                       onChange = {(event) => {
                        setSearchInput(event.target.value as string);
                       }}
                       multiline
                       variant="standard"
                       style = {{width: 120, height: 10, fontSize: 10}}
                 />
                 <div style = {{position: 'absolute'}}>
                <Select
                   style ={{ position: 'absolute', marginLeft: 850, width: 100, fontStyle: 'italic', bottom: 30}} 
                   native
                   id = "moneyType"
                   value = {currency}
                   onChange = {(event) => {
                    setCurrency(event.target.value as string);
                    localStorage.setItem("currency", event.target.value as string);
                   }}
                   inputProps ={{
                       name: 'moneyType',
                       id: 'money-type'
                   }}
                 >
                <option value = {0} style ={{fontStyle:'italic' }}>{"$ USD"}</option>
                <option value = {1} style ={{fontStyle:'italic' }}>{"€ Euro"}</option>
                <option value = {2} style ={{fontStyle:'italic' }} >{"£ Pound"}</option>
               </Select>
               { showFilterOrBag.showBag ? <div  onClick={closeModalHandlerBag} className="back-drop"></div> : null }
                 <Button variant = "text" style = {{position: 'absolute', left: 950, width: 50, bottom: 30}} onClick={() => setShowFilterOrBag({showFilter: false, showBag: true})} className="btn-openModal"><ShoppingCartIcon></ShoppingCartIcon></Button>
                 <Modal show={showFilterOrBag.showBag} close={closeModalHandlerBag} />
                
                 {showFilterOrBag.showFilter ? <div  onClick={closeModalHandlerFilter} className="back-drop"></div> : null }
                 <Button variant = "text" style = {{position: 'absolute', left: 1000, width: 130, bottom: 30}} onClick={() => {
                     setShowFilterOrBag({showFilter: true, showBag: false});
                     const revertToWomenData = localStorage.getItem("Women")
                     if (revertToWomenData !== null) {
                        setWomenData(JSON.parse(revertToWomenData));
                     }  
                 }} className="btn-openModal">Filter</Button>
                 <ModalFilter show={showFilterOrBag.showFilter} close={closeModalHandlerFilter} />
                 <Button onClick = {handleOnClickLoggIN} variant = "text" style = {{position: 'absolute', left: 1120, width: 100, bottom: 30 }}>{parsedUser?.isUserLoggedIn ? "LOG OUT" : "LOG IN"}</Button>
                 <text style = {{position: 'absolute', left: 1230, bottom: 40, fontWeight: 'bold'}}>{parsedUser?.name}</text>
                 <br/><br/>
                 <div style = {{position: 'absolute', display: 'flex', flexDirection: 'row'}}>
                <p style = {{fontWeight: 'bold', fontSize: 25, paddingLeft: 5, width: 400}}>{p.title}</p>
                <p style = {{fontWeight: 'bold', fontSize: 25, marginLeft: 400}}>{p.register}</p>
                </div>


                </div>
                </div>
       </div>

        
    );

}