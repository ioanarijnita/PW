import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Order } from "../models/orders-model";
import { Women } from "../models/women-model";
import OrderDataService from './../services/orders.service';

export const OrderContext = createContext<ReturnType<typeof useOrder>>(null!);

export function useOrderService() {
    const context = useContext(OrderContext);
    return context();
}

export function useOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderdata, setOrderdata] = useState<Women[][]>([[]]);
    return function () {
        const getOrders = async () => {
            await OrderDataService.getAll()
                .then(response => {
                    setOrders([...response.data])
                })
        }

        return {
            orders,
            setOrders,
            getOrders,
            orderdata,
            setOrderdata
        }
    }
}

export function OrderContextProvider(p: { children?: ReactNode }) {
    const service = useOrder();
    return <OrderContext.Provider value={service}>
        {p.children}
    </OrderContext.Provider>
}