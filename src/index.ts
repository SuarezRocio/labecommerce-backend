import express, { Request, Response } from 'express';
import cors from 'cors';
import { productos, users, purchase } from './database';
import { Tproductos, Tuser, ROLE, Tpurchase, ACCOUNT_TYPE } from './types';
import { db } from './practica/knex'

//import { users } from './database.ts';
//import productos from 'productos';
const app = express()

app.use(express.json())
app.use(cors())
//cors sirve para rodar locamente
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!')
})

app.get('/users', async (req: Request, res: Response) => {
  //res.send('Pagou os dados')
  try {
    const result = await db.raw(`
      SELECT * FROM users;
      `)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})


app.get('/productos', async (req: Request, res: Response) => {
  //res.send('Pagou os dados')
  try {
    const result = await db.raw(` SELECT * FROM productos;`)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})


app.get('/users/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string
    const result = await db.raw(`SELECT * FROM  users WHERE 
           name = "${q}" ;
         `)

    console.log(result)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})


app.get('/productos/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string
    //res.send(q)
    const result = productos.filter(
      (producto) => producto.name.toLowerCase().includes(q.toLowerCase()))

    const productoSearch = await db.raw(`SELECT * FROM productos WHERE 
           id = "${q}" ;
          `)

    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})

//POST criando um novo curso
app.post('/productos/newproductos', async (req: Request, res: Response) => {
  //pegar os dados : id, name, lessons, e stack
  try {
    const id = req.body.id 
    const name = req.body.name 
    const preco = req.body.preco 
    const categoria = req.body.categoria 

    if(typeof name !== "string"){
      res.status(400)
      throw new Error("name deve ser string")
    }
    
    const newProductos: Tproductos = {
      id,
      name,
      preco,
      categoria

    }

     await db.raw(`INSERT INTO productos (id, name, preco, categoria)
          VALUES ("${id}", "${name}","${preco}","${categoria}" );
          `)

    res.status(201).send("Cadastro realizado con suseso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})

app.post('/users/newUser', async (req: Request, res: Response) => {
  try {
    const name = req.body.name 
    const id = req.body.id 
    const email = req.body.email
    const password = req.body.password 
    const type = req.body.type
    
    
    if(typeof name !== "string"){
      res.status(400)
      throw new Error("name deve ser string")
    }
    
    const newUser: Tuser = {
      name,
      id,
      email,
      password,
      type
    }

    await db.raw(`INSERT INTO productos (name, id, email, password, type)
VALUES ("${name}" ,"${id}" ,"${email}","${password}", "${type}" );
`)
    res.status(201).send("Cadastro realizado con suseso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})


app.get('/purchase', async (req: Request, res: Response) => {
  try {
    const result = await db.raw(` SELECT * FROM purchase;`)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.post('/purchase/newPurchase', async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId 
    const productId = req.body.productId 
    const quantity = req.body.quantity 
    const totalPrice = req.body.totalPrice 
    const buyer_id = req.body.totalPrice
    
    if(typeof name !== "string"){
      res.status(400)
      throw new Error("name deve ser string")
    }
    
    const newPurchase: Tpurchase = {
      userId,
      productId,
      quantity,
      totalPrice
    }

    const Purchase = await db.raw(`INSERT INTO productos (userId, productId, quantity, totalPrice)
VALUES ("${userId}", "${productId}","${quantity}","${totalPrice}" "${buyer_id}");
`)
    res.status(201).send("Cadastro realizado con suseso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})


app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id[0] === "a") {
      res.status(400);
      throw new Error("Invalid id. Must be a string.");
    }
    const accountToDelete = users.findIndex((user) => user.id === id);
    if (accountToDelete >= 0) {
      users.splice(accountToDelete, 1);
    }
    res.status(200).send("Item deleted successfully");
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
      res.send("Unexpected error!");
    }
    res.send(error.message);
  }
});

//PUT -Editar account by id
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const newName = req.params.name
    const id = req.params.id
    const newid = req.body.id as string | undefined
    const newemail = req.body.email as string | undefined
    const newpassword = req.body.password as string | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined
    const accountToEdit = await db.raw(` SELECT * FROM users;`)
    if (accountToEdit) {
      accountToEdit.name = newName || accountToEdit.name
      accountToEdit.id = newid || accountToEdit.id //undefined
      accountToEdit.email = newemail || accountToEdit.email
      accountToEdit.password = newpassword || accountToEdit.password
    }
    if (newemail !== undefined) {
      if (typeof newemail !== "string") {
        res.status(400)
        throw new Error("email deve ser tipo string")
      }
    }

    if (newpassword !== undefined) {
      if (typeof newpassword !== "string") {
        res.status(400)
        throw new Error("password deve ser tipo string")
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400)
        throw new Error("name deve ser tipo string")
      }
    }


    if (newid !== undefined) {
      if (typeof newid !== "string") {
        res.status(400)
        throw new Error("id deve ser tipo string")
      }
    }

    //el undefined es porque si la persona no escirbe da error

    if (newType !== undefined) {
      if (newType !== ACCOUNT_TYPE.GOLD &&
        newType !== ACCOUNT_TYPE.PLATINUM &&
        newType !== ACCOUNT_TYPE.BLACK) {
      } {
        res.status(400)
        throw new Error("type deve ser um dos tipos validos")
      }
    }

    // verificamos se o user a ser editado realmente existe
    const [users] = await db.raw(`
       SELECT * FROM users
       WHERE id = "${id}";
     `) // desestruturamos para encontrar o primeiro item do array
    console.log(users) // [{id, name}]
    if (users) {
      await db.raw(`
           UPDATE users
           SET
             id = "${newid || users.id}",
             name = "${newemail || users.email}",             
             password = "${newpassword || users.password}",
             newType = "${newType || users.type}",
              
           WHERE
             id = "${id}";
         `)

    } else {
      res.status(404)
      throw new Error("'id' não encontrada")
    }

    res.status(201).send("Cadastro realizado con suseso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})

app.put("/productos/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.name as string | undefined
    const newPreco = req.body.preco as number | undefined
    const newCategoria = req.body.categoria as string | undefined
    const accountToEdit = await db.raw(` SELECT * FROM productos;`)
    if (accountToEdit) {
      accountToEdit.id = newId || accountToEdit.id //undefined
      accountToEdit.name = newOwnerName || accountToEdit.name
      accountToEdit.preco = newPreco || accountToEdit.preco
      accountToEdit.categoria = newCategoria || accountToEdit.categoria
    }
    if (newOwnerName !== undefined) {
      if (typeof newOwnerName !== "string") {
        res.status(400)
        throw new Error("name deve ser tipo string")
      }
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400)
        throw new Error("id deve ser tipo string")
      }
    }

    if (newPreco !== undefined) {
      if (typeof newPreco !== "number") {
        res.status(400)
        throw new Error("preco deve ser tipo number")
      }
      if (newPreco < 0) {
        res.status(400)
        throw new Error("preco deve ser maior  a cero")
      }
    }

    const [productos] = await db.raw(`
       SELECT * FROM users
       WHERE id = "${id}";
     `) 
    console.log(productos) 


    if (productos) {
      await db.raw(`
           UPDATE productos
           SET
             id = "${newId || productos.id}",
             name = "${newOwnerName || productos.name}",
             preco = "${newPreco || productos.preco}",
             categoria = "${newCategoria || productos.categoria}",
             
        
           WHERE
             id = "${id}";
         `)

    } else {
      res.status(404)
      throw new Error("'id' não encontrada")
    }

    res.status(201).send("Cadastro realizado con suseso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})


app.delete("/productos/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id[0] === "a") {
      res.status(400);
      throw new Error("Invalid id. It must be a string.");
    }
    // Find the element and remove it from the array
    const accountToDelete = productos.findIndex((product) => product.id === id);
    if (accountToDelete >= 0) {
      // Avoid the -1 from findIndex
      productos.splice(accountToDelete, 1);
    }
    res.status(200).send("Item deleted successfully");
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
      res.send("Unexpected error!");
    }
    res.send(error.message);
  }
});

