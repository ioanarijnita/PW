import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import { Header } from '../components/header';
import { Footer } from '../components/Footer';

export function FirstPage(props: any)
{
    var items = [
        {
            src1: "./photo.jpg",
            src2: "./photo2.jpg",
            src3: "./photo3.jpg"
        },
        {
            src1: "./photo3.jpg",
            src2: "./photo4.jpg",
            src3: "./photo5.jpg"
        }
    ]

    return (
        <div style = {{}}>
            <br />
            <Header />
            <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                <Carousel>
                    {
                        items.map( (item, i) => <Item key={i} item={item} /> )
                    }
                </Carousel>
            </div>
            <br /><br /><br /><br />
            <Footer />
        </div>
    )
}

function Item(props: { item: { src1: string, src2: string, src3: string }; })
{
    return (
        <div>
            <img src = {props.item.src1} style = {{width: 380, height: 500 }} />
            <img src = {props.item.src2} style = {{width: 380, height: 500, marginLeft: 50 }} />
            <img src = {props.item.src3} style = {{width: 380, height: 500, marginLeft: 50 }} />
        </div>
    )
}