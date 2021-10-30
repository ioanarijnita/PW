import React, { useEffect, useState } from "react";
import { useOrderService } from "../hooks/order-hooks";
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from "@material-ui/core";

export function AdminOrderDescription() {
    const { orderdata, } = useOrderService();
    const location = useLocation<{ index: number, total: number[] }>();
    const history = useHistory();
    const [size, setSize] = useState<number[]>([]);
    const { orders } = useOrderService();
    useEffect(() => {
        orderdata.filter((i, index2) => index2 === location.state.index).map((j, index3) => j.forEach((k, index) => {
            if (size[index] === undefined) {
                size[index] = 0;
            }
            size[index] = k.sizeIndex;
        }));
        setSize([...size])
    }, [orderdata])

    return (
        <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', marginLeft: 280, marginRight: 500, paddingTop: 10, paddingBottom: 10, marginTop: 50, borderRadius: 15, backgroundColor: '#e8f4f8' }}>
                    <text style={{ width: 200 }}><strong>First name: </strong>{orders[location.state.index].firstname}</text>
                    <text style={{ width: 200 }}><strong>Last name: </strong>{orders[location.state.index].surname}</text>
                    <text style={{ width: 200 }}><strong>Address: </strong>{orders[location.state.index].address}</text>
                    <text style={{ width: 200 }}><strong>Total: </strong>{location.state.total[location.state.index]}$</text>
                </div>
                {orderdata.filter((i, index2) => index2 === location.state.index).map((j, index3) => j.map((k, index) =>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%', }}>
                            <div style={{ display: 'flex', width: '10%', alignItems: 'flex-start', marginRight: 90, flexDirection: 'column' }}>
                                <text style={{ width: 100, textAlign: 'start' }}><strong>Brand: </strong>{k.brand}</text>
                                <br />
                                <text style={{ width: 100, textAlign: 'start' }}><strong>Name: </strong>{k.name}</text>
                                <br />
                                <text style={{ width: 100, textAlign: 'start' }}><strong>Price: </strong>{k.price}$</text>
                                <br />
                                <text style={{ width: 100, textAlign: 'start' }}><strong>Products: </strong>{k.productsAdded}</text>
                                <br />
                            </div>
                            <div style={{ marginTop: 180, marginLeft: -130, width: 340, flex: 1, flexDirection: 'row' }}>
                                {k.sizes?.map((item1, index1) => <Button variant="outlined" onClick={() => {
                                }} style={size[index] === index1 ? { backgroundColor: 'black', color: 'white' } : k?.removedSizes![index1] === index1 ? { opacity: 0.3, color: 'black' } : {}}>{item1}</Button>)}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '6%' }}>
                            <img style={{ width: 150, height: 200, marginLeft: 20 }} src={k.imageName} />
                        </div>
                    </div>
                ))}
            </div>

            <Button onClick={() => {
                history.push("/adminaddproduct")
            }} variant="outlined" style={{ position: 'absolute', right: 50, top: 50, backgroundColor: 'black', color: 'white' }}>Add an item</Button>
            <Button onClick={() => {
                history.push("/")
            }} variant="outlined" style={{ position: 'absolute', right: 50, top: 100, backgroundColor: 'black', color: 'white' }}>Go to Main Page</Button>

        </div>
    );
}