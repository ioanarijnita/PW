import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCartService } from '../hooks/cart-hooks';
import { useProductService } from '../hooks/product-hook';
import IMG_3324 from './IMG_3324.jpg' 
import photo from './photo.jpg';
import './styles.scss';

export function StoreItem(p: {brand: string, name: string, price: string, id: number, image?: string, isSoldOut: boolean}){

    const history = useHistory();
    const {getWomenById, womenData} = useProductService();
    const { bagItems } = useCartService();
    async function imageOnClick() {
        await getWomenById(p.id);
        history.push({
            pathname: '/productdescription',
            state: p.id
        })
    }

    return(
        <div className = "box" >
            <div>
                <br/><br/>
                    <img onClick = {imageOnClick} style = {{width: 100, height: 100}} src = {`./photo${p.id}.jpg`} />
                <br/>
                {p.isSoldOut ?
                <text>E SOLD OUT</text>
                : <></>}
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
