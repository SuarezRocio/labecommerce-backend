export type Tproductos ={
    name: string,
    id: string,
    categoria: string,
    preco: number
}

export type Tuser  ={
    name: string,
    email: string,
    id: string,
    password: string,
    type: ACCOUNT_TYPE
}

export enum ACCOUNT_TYPE {
    GOLD = "Ouro",
    PLATINUM = "Platina",
    BLACK = "Black"
}

export enum ROLE {
    ALIMENTOS = "alimentos"
    }

export type Tpurchase = {
    userId: string, 
    productId: string, 
    quantity: number,
    totalPrice: number
}    