import { Tproductos} from "./types"
import { Tuser} from "./types"
import { ROLE } from "./types"
import {Tpurchase} from "./types"
import {ACCOUNT_TYPE} from "./types"


export const productos: Tproductos[] = [
    {   id:"1",
        name:"milho", 
        preco: 15,
        categoria: ROLE.ALIMENTOS,
 },
    {
        name:"cebola",
        id:"2",
        preco: 15,
        categoria: ROLE.ALIMENTOS
    },
    {
        name:"alho" ,
        id:"3",
        preco: 15,
        categoria: ROLE.ALIMENTOS
     },
    {
        name:"salsa" ,
        id:"4",
        preco: 15,
        categoria: ROLE.ALIMENTOS
    },
    {
        name:"tomate" ,
        id:"5",
        preco: 15,
        categoria: ROLE.ALIMENTOS    
    },
    {
        name:"óleo" ,
        id:"5",
        preco: 15,
        categoria: ROLE.ALIMENTOS    
    },
    {
        name:"carne" ,
        id:"6",
        preco: 15,
        categoria: ROLE.ALIMENTOS    
    }
    ]


export const users: Tuser[] = [
    {
    name: "maria",
    id: "1", 
    email: "pepe@gmail.com" ,
    password: "5465465",
    type: ACCOUNT_TYPE.GOLD
},
{   name: "diogo", 
    id: "2", 
    email: "pepe@gmail.com" ,
    password: "5465465",
    type: ACCOUNT_TYPE.PLATINUM
},
{   name: "roberta",
    id: "3", 
    email: "pepe@gmail.com" ,
    password: "5465465",
    type: ACCOUNT_TYPE.GOLD
},
{   name: "miranda",
    id: "4", 
    email: "pepe@gmail.com" ,
    password: "5465465",
    type: ACCOUNT_TYPE.BLACK
},
{   name: "marcela",
    id: "5", 
    email: "pepe@gmail.com" ,
    password: "5465465",
    type: ACCOUNT_TYPE.BLACK
},
{   name: "martina", 
    id: "6", 
    email: "pepe@gmail.com" ,
    password: "5465465",
    type: ACCOUNT_TYPE.PLATINUM
}
]
export const purchase: Tpurchase[] = [
    {
        userId: users[0].id, 
        productId: productos[0].id, 
        quantity: 8,
        totalPrice: 8 * productos[0].preco
    },
    {
        userId: users[4].id, 
        productId: productos[4].id, 
        quantity: 2,
        totalPrice: 2 * productos[4].preco
    }
]


const getAllUsers = (): Tuser[] =>{
    return users
}
console.log(getAllUsers())

const getAllProductos = (): Tproductos[] =>{
    return productos
}
console.log(getAllProductos())

const createUserParams = (name: string, id : string, email: string, password: string, type: ACCOUNT_TYPE) : string => {
    users.push({name, id, email, password , type});
    return 'Se cargaron exitosamente';
  }
console.log(createUserParams)


const queryProductsByName = (q: string) => {
    if (!q) {
      console.log("Digite sua busca e tente novamente.");
      return;
    }
    const result = productos.filter((producto) =>
      producto.name.toLowerCase().includes(q.toLowerCase())
    );
    if (result.length > 0) {
      console.log(result.map((producto) => producto.name));
    } else {
      console.log("Nenhum produto foi achado!");
    }
  };
  console.log(queryProductsByName)


const queryProductosById = (id : string) => {
    const result = productos.filter( (productos) =>  productos.id === id)
        return result 
    }  
console.log(queryProductosById)


const getAllPurchasesFromIdUser = (id: string): Tpurchase[] => {
    return purchase.filter((purchase) => purchase.userId == id);
  };



    
      