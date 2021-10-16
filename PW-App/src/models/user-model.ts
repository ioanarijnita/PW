export interface User {
    username: string,
    password: string,
    name: string,
    surname: string,
    region: string,
    address: string,
    isUserLoggedIn?: boolean,
}

export interface UserLoggedIn extends User {
    isUserLoggedIn: boolean
}