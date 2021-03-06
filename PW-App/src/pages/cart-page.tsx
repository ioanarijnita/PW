import { Button, ButtonGroup } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { CurrencySelection, TotalAmmount } from '../App';
import { Header } from '../components/header';
import { useCartService } from '../hooks/cart-hooks';
import { User } from '../models/user-model';
import DeleteIcon from '@mui/icons-material/Delete';
import { Footer } from '../components/Footer';
export function CartPage() {
    const [size, setSize] = useState<number[]>([]);
    const [parsedUser, setParsedUser] = useState<User>();
    const { bagItems, setBagItems, makeTotal, selectedCurrencySymbol, getCurrencySymbol } = useCartService();
    const [total, setTotal] = useState(0);
    const { totalAmmount, setTotalAmmount } = useContext(TotalAmmount);
    const { currency, setCurrency } = useContext(CurrencySelection);

    useEffect(() => {
        const user = localStorage.getItem("User")
        if (user !== null) {
            setParsedUser(JSON.parse(user))
        }
        const bag = localStorage.getItem("bag");
        if (bag !== null) {
            setBagItems(JSON.parse(bag));
        }
        const total = localStorage.getItem("total")
        if (total !== null) {
            setTotal(parseInt(total))
        }
    }, [])

    useEffect(() => {
        for (let i = 0; i < bagItems.length; i++) {
            size.push(bagItems[i].sizeIndex);
        }
        setSize([...size])
    }, [bagItems])


    return (
        <div>
            <br />
            <Header title="CART" />
            {bagItems.map((item, index) =>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%', }}>
                        <div style={{ display: 'flex', width: '10%', alignItems: 'flex-start', marginRight: 90, flexDirection: 'column' }}>
                            <text style={{ width: 100, textAlign: 'start' }}>{item.brand}</text>
                            <br />
                            <text style={{ width: 100, textAlign: 'start' }}>{item.name}</text>
                            <br />
                            <text style={{ width: 100, textAlign: 'start' }}>{currency === "0" || currency === undefined ? item.price : currency === "1" ? parseInt((parseInt(item.price) / 1.16).toFixed(2)) : currency === "2" ? parseInt((parseInt(item.price) / 1.36).toFixed(2)) : ""} {selectedCurrencySymbol}</text>
                            <br />
                        </div>
                        <div style={{ marginTop: 110, marginLeft: -130, width: 340, flex: 1, flexDirection: 'row' }}>
                            {item.sizes?.map((item1, index1) => <Button variant="outlined" onClick={() => {
                                if (index1 !== item?.removedSizes![index1]) {
                                    size[index] = index1;
                                    setSize([...size]);
                                    bagItems[index].sizeIndex = index1;
                                    setBagItems([...bagItems]);
                                }

                                bagItems[index].productsAdded = 1;
                                localStorage.setItem("bag", JSON.stringify(bagItems));
                            }} style={size[index] === index1 ? { backgroundColor: 'black', color: 'white' } : item?.removedSizes![index1] === index1 ? { opacity: 0.3, color: 'black' } : {}}>{item1}</Button>)}

                            <Button onClick={() => {
                                bagItems.splice(index, 1);
                                setBagItems([...bagItems]);
                                localStorage.setItem("bag", JSON.stringify(bagItems));
                                makeTotal();
                            }} style={{ width: 50, height: 40, left: 50 }}>
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </div>
                    </div>
                    {/* onClick = {() => {counter > 1 ? setCounter(counter-1) : setCounter(0)}  } */}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6%' }}>
                        <div style={{ flexDirection: 'column' }}>
                            <Button variant="outlined" onClick={() => {
                                const arrayOfNumberOfProducts = bagItems.map(item => item.noProducts.split(","))
                                if (parseInt(arrayOfNumberOfProducts[index][bagItems[index].sizeIndex]) === bagItems[index].productsAdded) {
                                    bagItems[index].productsAdded = bagItems[index].productsAdded!;
                                } else {
                                    bagItems[index].productsAdded = bagItems[index].productsAdded! + 1;
                                }
                                setBagItems([...bagItems]);
                                localStorage.setItem("bag", JSON.stringify(bagItems));
                                makeTotal();
                            }}>+</Button>
                            <br /> <br /> <br /> <br />
                            <text>{bagItems[index].productsAdded}</text>
                            <br /> <br /> <br /> <br />
                            <Button variant="outlined" onClick={() => {
                                if (bagItems[index].productsAdded! > 2) {
                                    bagItems[index].productsAdded = bagItems[index].productsAdded! - 1;
                                } else {
                                    bagItems[index].productsAdded = 1;
                                }
                                setBagItems([...bagItems]);
                                localStorage.setItem("bag", JSON.stringify(bagItems));
                                makeTotal();
                            }} >-</Button>
                        </div>
                        <img style={{ width: 150, height: 200, marginLeft: 20 }} src={item.imageName} />
                    </div>
                </div>
            )}
            <br></br><br></br>
            <text style={!bagItems.length ? { left: 200, fontWeight: 'bolder', fontSize: 20, position: 'absolute', marginTop: 170 } : { marginRight: 720, fontWeight: 'bolder', fontSize: 20 }}>TOTAL: {totalAmmount} {selectedCurrencySymbol}</text>
            <div style={{ marginTop: 199 }}>
                <Footer />
            </div>
        </div>
    );
}

