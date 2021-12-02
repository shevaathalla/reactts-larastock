import { Product } from "./Product";

export interface Transaction {
    id:number,
    transaction_code: string,
    customer_name: string,        
    total_price: number,
    transaction_details: Array<TransactionDetails>
}

export interface TransactionCreate {
    customer_name: string,
    transaction_details: Array<TransactionDetails>,
    total_price: number

}

export interface TransactionDetails{
    id:number,
    product: Product,
    quantity: number,
    price: number,    
}