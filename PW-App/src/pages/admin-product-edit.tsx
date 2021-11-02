import { Button, Select, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Women } from "../models/women-model";
import WomenDataService from "./../services/women.service";

export function AdminProductEdit() {
    const location = useLocation<{ id: number }>();
    const history = useHistory();
    const [product, setProduct] = useState<Women>({
        id: 0,
        brand:"",
        name:"",
        size:"",
        noProducts:"",
        price:"",
        description:"",
        gender: 0,
        sizes: [],
        sizeIndex: 0,
        imageName: ''
    });
    const [showAlert, setShowAlert] = useState(0);
    const [numberProductsSizes, setNumberProductsSizes] = useState({
        XS: '',
        S: '',
        M: '',
        L: '',
        XL: ''
    })
    const inputRef = React.useRef<HTMLInputElement>(null)
    function showname () {
        setProduct({...product, imageName: inputRef.current?.files![0].name})
      }

      function AlertShowing() {
        return (
         <Alert variant="outlined" onClose={() => setShowAlert(0)} severity={showAlert === 1 ? "success" : "error"}>{showAlert === 1 ? "Item added successfully!" : "Please fill in all the fields!"}</Alert>
        );
    }
    useEffect(() => {
        WomenDataService.get(location.state.id)
            .then((res) => {
                setProduct(res.data);
            })
    }, [location.state.id])

    useEffect(() => {
        const noProductsArray = product.noProducts.split(",");
        setNumberProductsSizes({
            XS: noProductsArray[0],
            S: noProductsArray[1],
            M: noProductsArray[2],
            L: noProductsArray[3],
            XL: noProductsArray[4],
        });
    }, [product.noProducts])
    console.log(product)
    return <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <br /><br /><br />
        <Button
  variant="contained"
  style = {{width: 200, fontSize: 13}}>Upload Image
    <input style = {{left: 50, position: 'absolute', opacity: 0}} type="file" className="form-control" name="upload_file"  id = "fileInput" ref = {inputRef} onChange={() => showname()} />
    </Button>
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
        
                   <br /><br />
        <Button onClick = {() => {
            const numberOfProducts = `${numberProductsSizes.XS},${numberProductsSizes.S},${numberProductsSizes.M},${numberProductsSizes.L},${numberProductsSizes.XL}`;
            if (product.brand === '' || product.name === '' || numberProductsSizes.XS === '' || numberProductsSizes.S === '' || numberProductsSizes.M === '' || numberProductsSizes.L === '' || numberProductsSizes.XL === '' || product.price === '' || product.description === '' || product.imageName === '') {
                setShowAlert(2);
            } else {
                setShowAlert(1);
                WomenDataService.update(location.state.id, {...product, noProducts: numberOfProducts});
                history.goBack();
            }
        }} variant = "outlined">
            SUBMIT
        </Button>

        {showAlert ? <AlertShowing></AlertShowing> : <></>}
    </div>

}