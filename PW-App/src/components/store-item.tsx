import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCartService } from '../hooks/cart-hooks';
import { useProductService } from '../hooks/product-hook';
import './styles.scss';
import HoverImage from "react-hover-image";

export function StoreItem(p: {brand: string, name: string, price: string, id: number, image?: string, isSoldOut: boolean}){

    const history = useHistory();
    const {getWomenById, womenData} = useProductService();
    const { bagItems } = useCartService();
    const [onClick, setOnClick] = useState(false);
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

    const [isHover, setIsHover] = useState(false);

    return(
        <div  >
            <div style = {{display: 'flex', flexDirection: 'column'}}>
                <br/><br/>
                <div className = "head-text">
                    {p.isSoldOut ?  
                    
                    <img  style = {isHover ? {width: 350, height: 450, marginLeft: 50, opacity: 0.5} : {width: 250, height: 350, marginLeft: 50, opacity: 0.5}} src = {`./photo${p.id}.jpg`} 
                    // onMouseOver = {() => setIsHover(true)}
                    // onMouseOut = {() => setIsHover(false)}
                   
                   /> :
                    <img onClick = {imageOnClick} style = {isHover ? {width: 350, height: 450, marginLeft: 50} : {width: 250, height: 350, marginLeft: 50}} src = {`./photo${p.id}.jpg`} 
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
                <text>{p.price}</text>
               
               
                
            
            </div>
           
        </div>
    );
}

export default StoreItem;
