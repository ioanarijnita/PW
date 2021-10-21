import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { Select } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { GenderSelection } from '../App';
import { Header } from '../components/header';
import './styles.scss';
import StoreItem from '../components/store-item';
import { useLoginService } from '../hooks/login-hooks';
import WomenDataService from '../services/women.service';
import { useProductService } from '../hooks/product-hook';
import { Women } from '../models/women-model';
import { Footer } from '../components/Footer';

export function ProductList(){

    const { getUsers } = useLoginService();
    const { getWomen, womenData, searchInput, isSoldOut, searchResults, soldOut } = useProductService();
    const { gender, setGender} = useContext(GenderSelection);

    useEffect(() => {
      getUsers()
    }, [])

    useEffect ( () => {
        getWomen();
    }, [])

    React.useEffect(() => {
        isSoldOut();
    },[womenData, searchResults])

    return (
    <div >
     <br/>
       <Header title = {gender === 0 ? "Women" : gender === 1 ? "Men" : gender === 2 ? "Kids" : "My Shop"}></Header>
       <br/><br/><br/><br/><br/><br/>
       <div style = {{flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginRight: 20}}>
            {(!searchInput ? womenData : searchResults!).map((item, index) => item.gender === gender || gender === undefined || gender === null ? <StoreItem imageName = {item.imageName!} id = {item.id!} brand = {item.brand} name = {item.name} isSoldOut = {soldOut[index]} price = {item.price}></StoreItem> : <></>)
          }      
       </div>
       <Footer></Footer>
    </div>
    );
}