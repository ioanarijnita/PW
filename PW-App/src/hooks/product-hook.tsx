import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserLoggedIn } from "../models/user-model";
import { Women } from "../models/women-model";
import WomenDataService from "../services/women.service";

export const ProductContext = createContext<ReturnType<typeof useProduct>>(null!);

export function useProductService(){
    const context = useContext(ProductContext);
    return context();
}

export function useProduct(){
    const [womenData, setWomenData] = useState<Women[]>([{
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
    }])
    const [womenDataById, setWomenDataById] = useState<Women>()
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Women[]>();
    const [soldOut, setSoldOut] = useState<boolean[]>([]);
    return function() {
        const getWomen = () => { 
            WomenDataService.getAll()
            .then(response => {
            // setUserData(response.data)
            setWomenData([...response.data]) 
            localStorage.setItem("Women", JSON.stringify(response.data));
            }) 
        }

        const getWomenById = async (id: number) => { 
            await WomenDataService.get(id)
            .then(response => {
            // setUserData(response.data)
            setWomenDataById(response.data)
            // localStorage.setItem("WomenDataById", JSON.stringify(response.data))
            }) 
        }

        function isSoldOut() {
        const isSoldOutArray: boolean[] = [];

        const womenDataOrSearchResults = !searchInput ? womenData : searchResults;
        const arrayOfNumberOfProducts =  womenDataOrSearchResults?.map(item => item.noProducts.split(","))

            for (let i=0; i<womenDataOrSearchResults?.length!; i++) {
                if (arrayOfNumberOfProducts![i].every(item => item === "0")) {
                    isSoldOutArray[i] = true;
                } else {
                  isSoldOutArray[i] = false;
                }
            }
            setSoldOut([...isSoldOutArray]);
            
        }

        const updateWomenById = (id: number, data: Women) => {
                WomenDataService.update(
                    id,
                    data
                )
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
        }

        return {
            womenData,
            setWomenData,
            getWomen,
            getWomenById,
            womenDataById,
            searchInput,
            setSearchInput,
            searchResults,
            setSearchResults,
            updateWomenById,
            soldOut,
            setSoldOut,
            isSoldOut
        }
    }
}

export function WomenContextProvider(p: {children?: ReactNode}) {
    const service = useProduct();
    return <ProductContext.Provider value = {service}>
        {p.children}
    </ProductContext.Provider>
}