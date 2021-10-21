import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserLoggedIn } from "../models/user-model";
import StoreDataService from "../services/users.service";
export const LoginContext = createContext<ReturnType<typeof useLogin>>(null!);

export function useEffectAsync(fn: () => Promise<void>, deps: any[]) {
    useEffect(() => {
        fn()
    }, deps);
}

export function useLoginService() {
    const context = useContext(LoginContext);
    return context();
}

function useLogin() {
    const [userData, setUserData] = useState<User[]>([{
        id: 0,
       username: '',
       password: '',
       name: '',
       surname: '',
       region: '',
       address: '',
       isUserLoggedIn: false
    }])
    const [userObj, setUserObj] = useState<User>()
    const [userIndex, setUserIndex] = useState(0);

    return function() {
        const getUsers = () => {
            StoreDataService.getAll()
            .then(response => {
                setUserData(response.data)
            }) 
        }

        
        return {
            getUsers,
            userData,
            setUserData,
            userIndex,
            setUserIndex,
            userObj,
            setUserObj
        }
    }
}

export function LoginContextProvider(p: {children?: ReactNode}) {
    const service = useLogin();
    return <LoginContext.Provider value = {service}>
        {p.children}
    </LoginContext.Provider>
}