import React, { useContext, useEffect, useState } from 'react';
import {Button} from '@material-ui/core';
import { Header } from '../components/header';
import StoreItem from '../components/store-item';
import '../components/styles.scss';
import { CartContext, useCartService } from '../hooks/cart-hooks';
import { useLocation } from 'react-router-dom';
import { useProductService } from '../hooks/product-hook';
import { CurrencySelection, TotalAmmount } from '../App';
import { Footer } from '../components/Footer';

type ProductItem = {
    brand: string,
    name: string,
    size: string,
    price: string,
    description: string
}

export function ProductDescription(){

    const [size, setSize] = useState<number>();
    const [sizes, setSizes] = useState(["XS","S","M","L","XL"]);
    const [removeSizes, setRemoveSizes] = useState<number[]>([]);
    const [productsAdded, setProductsAdded] = useState<number[]>([]);
    const { getWomenById, womenDataById } = useProductService();
    const { totalAmmount, setTotalAmmount } = useContext(TotalAmmount);
    const { bagItems, setBagItems, makeTotal, getCurrencySymbol, selectedCurrencySymbol, convertedPrice } = useCartService();
    const { currency, setCurrency } = useContext(CurrencySelection);
    
    let counter = 0;
    function addToCart() {
        counter = counter + 1;
        const alreadyExistingItem = bagItems.find(item => (item.name === womenDataById?.name) && (item.sizeIndex === size));
        const index = bagItems.indexOf(alreadyExistingItem!);
        if (index > -1) {
            bagItems[index].productsAdded = bagItems[index].productsAdded! + 1;
            setBagItems([...bagItems]);
        } else {
            bagItems.push({...womenDataById!, sizeIndex: size!, sizes: sizes, productsAdded: counter, removedSizes: removeSizes});
        }
        localStorage.setItem("bag", JSON.stringify(bagItems));
        makeTotal();
    }
    const location = useLocation<number>();

    useEffect(() => {
        getWomenById(location.state);
    }, [])

    useEffect(() => {
        if (womenDataById !== undefined) {
            const productsArray = womenDataById?.noProducts.split(',')!;
            for(let i=0; i<5; i++) {
                if (productsArray[i] === "0") {
                        removeSizes[i] = i;
                }
            }
        }
        setRemoveSizes([...removeSizes]);
    }, [womenDataById?.id, ])

    // useEffect(() => {
    //     setSizes(sizes.filter(item => !removeSizes.includes(item)));
    // }, [removeSizes])
    
    useEffect(() => {
        getCurrencySymbol();
    }, [currency])

    useEffect(() => {
        const currency = localStorage.getItem("currency");
        if (currency !== null) {
          setCurrency(currency);
        }
    }, [])

    return(
<div>
    <br/>
    <Header title = {`${womenDataById?.brand} ${womenDataById?.name}`}></Header>
    <div style = {{display: 'flex', justifyContent:'center'}}>
    <br/><br/>
    <img style = {{width: 600, height: 400, position: 'absolute', left: 250, marginTop: 175}} src = {`./photo${womenDataById?.id}.jpg`} />
    <img style = {{width: 100, height: 100, position: 'absolute', left: 80, marginTop: 175}} src = {`./photo${womenDataById?.id}.jpg`} />
    <br/>
    <img style = {{width: 100, height: 100, position: 'absolute', left: 80, marginTop: 300}} src = {`./photo${womenDataById?.id}.jpg`} />
    <br/>
    <img style = {{width: 100, height: 100, position: 'absolute', left: 80, marginTop: 425}} src = {`./photo${womenDataById?.id}.jpg`} />
    <br/>
    <div style = {{textAlign:'left', marginLeft: 750, marginTop: 160}}>
        <text className = "text-style" style = {{ fontWeight: 'bold', fontSize: 35}}>{womenDataById?.brand}</text>
        <br/> <br/>
        <text className = "text-style">{womenDataById?.name}</text>
        <br/> <br/>

        <div>
        <text className = "text-style" style = {{fontWeight: 'bold'}} >size:</text>
        <br />
        {sizes.map((item, index) => <Button variant = "outlined" onClick = {() => {
            if (index !== removeSizes[index]) {
                setSize(index)
            }
        }} style = {size === index ? {backgroundColor: 'black', color: 'white'} : removeSizes[index] === index ? {opacity: 0.3, color: 'black'} : {}}>{item}</Button>)}
        </div>
        <br/>
        <text className = "text-style" style = {{fontWeight: 'bold'}}>{convertedPrice} {selectedCurrencySymbol}</text>
        <br/> <br/>
        <Button onClick = {addToCart} variant = "contained" style = {{color: 'white', backgroundColor: 'green'}} >Add to cart</Button>
        <br/> <br/>
        <text>{womenDataById?.description}</text>
    </div>
    </div>
</div>
    );
}
