import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useProductService } from "../hooks/product-hook";
import DeleteIcon from '@mui/icons-material/Delete';
export function AdminProductList() {
    const { womenData, getWomen, deleteProductAdmin, setWomenData } = useProductService();
    const history = useHistory();

    useEffect ( () => {
        getWomen();
    }, [womenData])

    return (
       <div>
            <Button onClick = {() => {
               history.push("/adminaddproduct")
           }} variant = "outlined" style = {{position: 'absolute', right: 50, top: 50, backgroundColor: 'black', color: 'white'}}>Add an item</Button>
            <Button onClick = {() => {
               history.push("/")
           }} variant = "outlined" style = {{position: 'absolute', right: 50, top: 100, backgroundColor: 'black', color: 'white'}}>Go to Main Page</Button>
           
             {womenData.map((item, index) =>
        <div style = {{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly'}}>
        <div style = {{display: 'flex', flexDirection: 'row', marginTop: '10%', }}>
            <div style = {{display: 'flex', width: '10%', alignItems: 'flex-start', marginRight: 90, flexDirection: 'column'}}>
                <text style = {{width: 100, textAlign: 'start'}}>{item.brand}</text>
                <br/>
                <text style = {{width: 100, textAlign: 'start'}}>{item.name}</text>
                <br/>
                <text style = {{width: 100, textAlign: 'start'}}>{item.description}</text>
                <br/>
                <text style = {{width: 100, textAlign: 'start'}}>{item.price}$</text>
                <br/>
            </div>
            <div style = {{marginTop: 110, marginLeft: -130, width: 340, flex:1, flexDirection: 'row'}}>
    
            <Button onClick = {() => {
                deleteProductAdmin(item.id!)
            }} style = {{width: 50, height: 40, left: 50}}>
                <DeleteIcon></DeleteIcon>
            </Button>
            </div>
        </div>
        <div style = {{display: 'flex', flexDirection: 'row', marginTop: '6%'}}>
            <div style = {{flexDirection: 'column'}}>
                <br /> <br /> <br /> <br />
                <text>{womenData[index].productsAdded}</text>
                <br /> <br /> <br /> <br/>
            </div>
            <img style = {{width: 150, height: 200, marginLeft: 20}} src = {item.imageName}/>
        </div>
        </div>
        )}
       </div> 
    );
}