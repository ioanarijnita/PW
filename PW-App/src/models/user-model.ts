export interface User {
    id: number,
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