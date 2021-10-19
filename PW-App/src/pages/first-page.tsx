import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import { Header } from '../components/header';
import { Footer } from '../components/Footer';

export function FirstPage(props: any)
{
    var items = [
        {
            src1: "./250.jpg",
            src2: "./251.jpg",
            src3: "./252.jpg"
        },
        {
            src1: "./253.jpg",
            src2: "./254.jpg",
            src3: "./255.jpg"
        },
        {
            src1: "./256.jpg",
            src2: "./257.jpg",
            src3: "./258.jpg"
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