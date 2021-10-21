import { Button, TextField, Select } from '@material-ui/core';
import axios from 'axios';
import { AnyARecord } from 'dns';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useProductService } from '../hooks/product-hook';
import { Women } from '../models/women-model';
import Alert from '@mui/material/Alert';
export function AdminAddProduct() {
    const [showAlert, setShowAlert] = useState(0);
    const [product, setProduct] = useState<Women>({
        id: 0,
        brand:"",
        name:"",
        size:"XS,S,M,L,XL",
        noProducts:"",
        price:"",
        description:"",
        gender: 0,
        sizes: [],
        sizeIndex: 0,
        imageName: ''
    })
    const [numberProductsSizes, setNumberProductsSizes] = useState({
        XS: '',
        S: '',
        M: '',
        L: '',
        XL: ''
    })
    const history = useHistory();
    const {addProductAdmin} = useProductService();
    const inputRef = React.useRef<HTMLInputElement>(null)
    function showname () {
        setProduct({...product, imageName: inputRef.current?.files![0].name})
      }

   function AlertShowing() {
    return (
     <Alert variant="outlined" onClose={() => setShowAlert(0)} severity={showAlert === 1 ? "success" : "error"}>{showAlert === 1 ? "Item added successfully!" : "Please fil all the fields!"}</Alert>
    );
}
    return (
        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: 50, marginTop: 50 }}>
            <Button
  variant="contained"
  style = {{width: 200, fontSize: 13}}>Upload Image
    <input style = {{position: 'absolute', left: 50, opacity: 0}} type="file" className="form-control" name="upload_file"  id = "fileInput" ref = {inputRef} onChange={() => showname()} />
    </Button>
    <br />
    <text style = {{fontSize: 12}}>{product.imageName}</text>
            {/* <input type="file" className="form-control" name="upload_file"  id = "fileInput" ref = {inputRef} onChange={() => showname()} /> */}
            <br />
            <TextField 
                style = {{width: 180}}  
                value = {product.brand} 
                onChange = {(e: any) => {     
                    setProduct ({...product, brand: e.target.value})
                }
                } 
                label="BRAND" 
                variant="standard" 
                InputLabelProps = {{style : {fontSize: 10}}}
            /><br />
            <TextField 
                style = {{width: 180}}  
                value = {product.name} 
                onChange = {(e: any) => {     
                    setProduct ({...product, name: e.target.value})
                }
                } 
                label="NAME" 
                variant="standard" 
                InputLabelProps = {{style : {fontSize: 10}}}
            /><br />
            <div style = {{display:'flex', flexDirection: 'row'}}>
                <TextField 
                    style = {{width: 30}}  
                    value = {numberProductsSizes.XS} 
                    onChange = {(e: any) => {     
                        setNumberProductsSizes ({...numberProductsSizes, XS: e.target.value})
                    }
                    } 
                    label="XS" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}
                /><br />

                <TextField 
                    style = {{width: 30, marginLeft: 6}}  
                    value = {numberProductsSizes.S} 
                    onChange = {(e: any) => {     
                        setNumberProductsSizes ({...numberProductsSizes, S: e.target.value})
                    }
                    } 
                    label="S" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}
                /><br />

                <TextField 
                    style = {{width: 30, marginLeft: 6}}  
                    value = {numberProductsSizes.M} 
                    onChange = {(e: any) => {     
                        setNumberProductsSizes ({...numberProductsSizes, M: e.target.value})
                    }
                    } 
                    label="M" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}
                /><br />

                <TextField 
                    style = {{width: 30, marginLeft: 6}}  
                    value = {numberProductsSizes.L} 
                    onChange = {(e: any) => {     
                        setNumberProductsSizes ({...numberProductsSizes, L: e.target.value})
                    }
                    } 
                    label="L" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}
                /><br />

                <TextField  
                    style = {{width: 30, marginLeft: 6}}  
                    value = {numberProductsSizes.XL} 
                    onChange = {(e: any) => {     
                        setNumberProductsSizes ({...numberProductsSizes, XL: e.target.value})
                    }
                    } 
                    label="XL" 
                    variant="standard" 
                    InputLabelProps = {{style : {fontSize: 10}}}
                /><br />
            </div>
            <TextField 
                style = {{width: 180}}  
                value = {product.price} 
                onChange = {(e: any) => {     
                    setProduct ({...product, price: e.target.value})
                }
                } 
                label="PRICE" 
                variant="standard" 
                InputLabelProps = {{style : {fontSize: 10}}}
            /><br />
            <TextField 
                style = {{width: 180}}  
                value = {product.description} 
                onChange = {(e: any) => {     
                    setProduct ({...product, description: e.target.value})
                }
                } 
                label="DESCRIPTION" 
                variant="standard" 
                InputLabelProps = {{style : {fontSize: 10}}}
            /><br />
            <Select
                   style ={{width: 180 }} 
                   native
                   id = "gender"
                   value = {product.gender}
                   onChange = {(event: any) => {
                    setProduct({...product, gender: event.target.value as number})
                   }}
                //    inputProps ={{
                //        name: 'moneyType',
                //        id: 'money-type'
                //    }}
                 >
                <option value = {0} style ={{fontStyle:'italic' }}>{"Women"}</option>
                <option value = {1} style ={{fontStyle:'italic' }}>{"Men"}</option>
                <option value = {2} style ={{fontStyle:'italic' }} >{"Kids"}</option>
               </Select>
            <br /> <br />
            {showAlert ? <AlertShowing></AlertShowing> : <></>}
            <div style = {{display: 'flex', flexDirection:'row', marginLeft: 750, marginTop: -40}}>
                <Button onClick = {() => {
                    const numberOfProducts = `${numberProductsSizes.XS},${numberProductsSizes.S},${numberProductsSizes.M},${numberProductsSizes.L},${numberProductsSizes.XL}`;
                    // setProduct({...product, noProducts: numberOfProducts})
                    if (product.brand === '' || product.name === '' || numberProductsSizes.XS === '' || numberProductsSizes.S === '' || numberProductsSizes.M === '' || numberProductsSizes.L === '' || numberProductsSizes.XL === '' || product.price === '' || product.description === '' || product.imageName === '') {
                        setShowAlert(2);
                    } else {
                        setShowAlert(1);
                        addProductAdmin({...product, noProducts: numberOfProducts});
                        setProduct({...product, brand: '', name: '', price: '', noProducts: '', description: '', gender: 0, imageName: ''});
                        setNumberProductsSizes({XS:'', S: '', M: '', L: '', XL: ''})
                    }
                }} variant = "outlined" style = {{marginRight: 50, backgroundColor: 'black', color: 'white'}}>ADD PRODUCT</Button>
                <Button variant = "outlined" style = {{backgroundColor: 'black', color: 'white'}} onClick = {() => history.push("/")}>GO TO MAIN PAGE</Button>
            </div>
        </div>
    );
}