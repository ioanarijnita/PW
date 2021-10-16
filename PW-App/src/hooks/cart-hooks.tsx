import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CurrencySelection, TotalAmmount } from "../App";
import { Women } from "../models/women-model";
import { useProductService } from "./product-hook";

export const CartContext = createContext<ReturnType<typeof useCart>>(null!);

export function useCartService() {
    const context = useContext(CartContext);
    return context();
}

function useCart() {
    const [bagItems, setBagItems] = useState<Women[]>([])
    const { totalAmmount, setTotalAmmount } = useContext(TotalAmmount);
    const { currency, setCurrency } = useContext(CurrencySelection);
    const { womenDataById } = useProductService();
    const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('$');
    // const k = parseInt(womenDataById?.price!)
    const [convertedPrice, setConvertedPrice] = useState(0);
    const [rerenderTotal, setRerenderTotal] = useState(false);
    
    useEffect(() => {
        setConvertedPrice(parseInt(womenDataById?.price!));
    }, [womenDataById?.price])

    return function() {

        function makeTotal() {
            let sum = 0;
            console.log("PRRR")
            bagItems.forEach(item => {
                sum = sum + (parseInt(item.price)! * item.productsAdded!);
            })
            localStorage.setItem("total", String(sum));
            console.log("SSH")
            setTotalAmmount(sum);
            setRerenderTotal(!rerenderTotal);
        }

        function getCurrencySymbol() {
            if (currency === "0") {
                setSelectedCurrencySymbol("$");
                setConvertedPrice(parseInt(womenDataById?.price!));
            } else if (currency === "1") {
                setSelectedCurrencySymbol("€");
                setConvertedPrice(parseInt((parseInt(womenDataById?.price!) / 1.16).toFixed(2)));
            } else if (currency === "2") {
                setSelectedCurrencySymbol("£");
                setConvertedPrice(parseInt((parseInt(womenDataById?.price!) / 1.36).toFixed(2)));
            }
        }

        return {
            bagItems,
            setBagItems,
            makeTotal,
            getCurrencySymbol,
            selectedCurrencySymbol,
            convertedPrice,
            rerenderTotal,
            setTotalAmmount,
            setRerenderTotal
        }
    }
}

export function CartContextProvider(p: {children?: ReactNode}) {
    const service = useCart();
    return <CartContext.Provider value = {service}>
        {p.children}
    </CartContext.Provider>
}