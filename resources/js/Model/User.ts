export interface User {
    id: number;
    name: string;
    email: string;
}
export interface UserRegister{
    firstname: string;
    lastname:string;
    email:string;
    password:string;
    password_confirmation:string;
}

export interface UserLogin{    
    email:string;
    password:string;
}
