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

export function ProductList(){

    const { getUsers } = useLoginService();
    const { getWomen, womenData, searchInput, isSoldOut, searchResults, soldOut } = useProductService();
    const { gender, setGender} = useContext(GenderSelection);
    const [dataDisplayed, setDataDisplayed] = useState<Women[]>(womenData);
    const [womenStorage, setWomenStorage] = useState<Women[]>([]);
    useEffect(() => {
      getUsers()
      // WomenDataService.create({
          // brand: 'H&M',
          // description: 'black jeans with stars',
          // name: 'Jeans',
          // size: 'XS,S,M,L,XL',
          // noProducts: '0,2,5,1,4',
          // price: '150',
          // gender: 2
      // }).then(res => console.log(res.data))
    }, [])

  //   useEffect(() => {
  //     const women = localStorage.getItem("Women")
  //     if (women !== null) {
  //         setWomenStorage(JSON.parse(women))
  //     }
  // }, [womenData])

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
            {(!searchInput ? womenData : searchResults!).map((item, index) => item.gender === gender || gender === undefined || gender === null ? <StoreItem id = {item.id!} brand = {item.brand} name = {item.name} isSoldOut = {soldOut[index]} price = {item.price}></StoreItem> : <></>)
          }      
       </div>
    </div>
    );
}