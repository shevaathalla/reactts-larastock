export interface Product {
    id: number;
    name: string;
    stock: number;
    price: number;
}

export interface ProductCreate {
    product_name: string;
    product_stock: number;
    product_price: number;
}