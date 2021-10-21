import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCartService } from '../hooks/cart-hooks';
import { useProductService } from '../hooks/product-hook';
import './styles.scss';
import HoverImage from "react-hover-image";
import { CurrencySelection } from '../App';

export function StoreItem(p: {imageName: string, brand: string, name: string, price: string, id: number, image?: string, isSoldOut: boolean}){

    const history = useHistory();
    const {getWomenById, womenData} = useProductService();
    const { selectedCurrencySymbol } = useCartService();
    const { bagItems } = useCartService();
    const [onClick, setOnClick] = useState(false);
    const { currency, setCurrency } = useContext(CurrencySelection);
    const [priceConverted, setPriceConverted] = useState<number>()
    async function imageOnClick() {
        setOnClick(true);
        if (onClick === true) {
            await getWomenById(p.id);
        history.push({
            pathname: '/productdescription',
            state: p.id
        })
    }
}

function convertPriceForEachItem() {
    if (currency === "0") {
        setPriceConverted(parseInt(p.price));
    } else if (currency === "1") {
        setPriceConverted(parseInt((parseInt(p.price) / 1.16).toFixed(2)));
    } else if (currency === "2") {
        setPriceConverted(parseInt((parseInt(p.price) / 1.36).toFixed(2)));
    }
}

useEffect(() => {
    convertPriceForEachItem();
}, [currency, p.price])

    const [isHover, setIsHover] = useState(false);

    return(
        <div  >
            <div style = {{display: 'flex', flexDirection: 'column'}}>
                <br/><br/>
                <div className = "head-text">
                    {p.isSoldOut ?  
                    
                    <img  style = {isHover ? {width: 350, height: 450, marginLeft: 50, opacity: 0.5} : {width: 250, height: 350, marginLeft: 50, opacity: 0.5}} src = {`./${p.imageName}`} 
                    // onMouseOver = {() => setIsHover(true)}
                    // onMouseOut = {() => setIsHover(false)}
                   
                   /> :
                    <img onClick = {imageOnClick} style = {isHover ? {width: 350, height: 450, marginLeft: 50} : {width: 250, height: 350, marginLeft: 50}} src = {`./${p.imageName}`} 
                    onMouseOver = {() => setIsHover(true)}
                    onMouseOut = {() => setIsHover(false)}
                  
                   
                    />
                    }
                     {p.isSoldOut ? 
                     <div className = "text-on-image">SOLD OUT</div>
                    // () => setOnClick(false)
                     
                     : <></>}
                     {/* :  () => setOnClick(true)} */}
       
                  
                    </div>
                    
                    {/* <HoverImage onClick = {imageOnClick} style = {{width: 100, height: 100}} hoverSrc =  {`./photo${p.id}.jpg`} src = {`./photo${p.id}.jpg`} /> */}
                <br/>
                {/* {p.isSoldOut ?
                <text>E SOLD OUT</text>
                : <></>} */}
                <br />
                <text>{p.brand}</text>
                <br />
                <text>{p.name}</text>
                <br/>
                <text>{priceConverted} {selectedCurrencySymbol}</text>
               
               
                
            
            </div>
           
        </div>
    );
}

export default StoreItem;
