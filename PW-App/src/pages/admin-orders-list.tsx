import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffectAsync } from "../hooks/login-hooks";
import { useOrderService } from "../hooks/order-hooks";
import OrderDataService from './../services/orders.service';
export function AdminOrdersList() {
    const { orders, setOrders, getOrders, orderdata, setOrderdata, } = useOrderService();
    const [total, setTotal] = useState<number[]>([]);
    const history = useHistory();
    useEffect(() => {
        setTotal([]);
        getOrders();
    }, [])
    console.log(total)
    useEffectAsync(async () => {

        try {
            orders.forEach((item, index) => {
                const parsed = JSON.parse(item.orderdata);
                parsed.forEach((item2: any, index2: number) => {
                    if (orderdata[index] === undefined) {
                        orderdata[index] = [];
                    };
                    orderdata[index][index2] = parsed[index2];
                })
            })
        } catch (e) {
            console.log("ERR ", e)
        }

        setOrderdata([...orderdata]);
    }, [orders])

    useEffect(() => {

        orders.forEach((item, index) => {
            let sum = 0;
            { orderdata.filter((i, index2) => index2 === index).map(j => j.map(k => sum = sum + parseInt(k.price))) };
            total.push(sum);
        })

    }, [orders])

    return (
        <div style={{}}>
            <p style={{ fontWeight: 'bold', fontSize: 24 }}>Orders</p>
            {orders.map((item, index) => <div style={{ display: 'flex', flexDirection: 'row', marginTop: 120, paddingTop: 10, paddingBottom: 10, marginLeft: 230, marginRight: 330, borderRadius: 15, borderWidth: 1, backgroundColor: '#e8f4f8', borderColor: 'blue', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <text><strong>First name:</strong> {item.firstname}</text>
                <text><strong>Last name:</strong> {item.surname}</text>
                {orderdata.filter((i, index2) => index2 === index).map((j, index3) => j.map(k => <text><strong>Total: </strong>{total[index]}$</text>).pop())}
                <Button onClick={() => {
                    history.push({
                        pathname: '/adminorderdescription',
                        state: {
                            index: index,
                            total: total
                        },
                    })
                }}>SEE ORDER {item.id}</Button>
                <Button onClick={async () => {
                    await OrderDataService.delete(item.id!)
                    getOrders();
                }}>SEND</Button>
                <br /><br />
            </div>)}
            <Button onClick={() => {
                history.push("/adminaddproduct")
            }} variant="outlined" style={{ position: 'absolute', right: 50, top: 50, backgroundColor: 'black', color: 'white' }}>Add an item</Button>
            <Button onClick={() => {
                history.push("/")
            }} variant="outlined" style={{ position: 'absolute', right: 50, top: 100, backgroundColor: 'black', color: 'white' }}>Go to Main Page</Button>
        </div>
    );
}