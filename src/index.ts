import express, { Request, Response } from 'express';
import cors from 'cors';
//import { productos, users, purchase } from './database';
import { Tproductos, Tuser, ROLE, Tpurchase, ACCOUNT_TYPE } from './types';
import { db } from './practica/knex'

const app = express()

app.use(express.json())
app.use(cors())
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003")
})


app.get('/users', async (req: Request, res: Response) => {
  try {


    const result = await db.select("*").from("users")
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

  try {


    const result = await db.select("*").from("productos")

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
    const q = req.query.q

    const [users] = await db("users").where({ id: q })

    res.status(200).send({ users })


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
    const q = req.query.q 

  
   
    const [productos] = await db("productos").where({ id: q })
    
    res.status(200).send({ productos })

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


//POST criando um novo curso
app.post('/productos/newproductos', async (req: Request, res: Response) => {
  //pegar os dados : id, name, lessons, e stack
  try {
    const id = req.body.id
    const name = req.body.name
    const preco = req.body.preco
    const categoria = req.body.categoria

    if (typeof name !== "string") {
      res.status(400)
      throw new Error("name deve ser string")
    }

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("id deve ser string")
    }

    if (typeof preco !== "number") {
      res.status(400)
      throw new Error("preco deve ser number")
    }

    if (typeof categoria !== "string") {
      res.status(400)
      throw new Error("categoria deve ser string")
    }

    const newProductos: { id: string, name: string, preco: number, categoria: string } = {
      id,
      name,
      preco,
      categoria
    }
    await db("productos").insert( newProductos )

    res.status(200).send("Cadastro realizado con suseso")
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


    if (typeof name !== "string") {
      res.status(400)
      throw new Error("name deve ser string")
    }

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("id deve ser string")
    }

    if (typeof email !== "string") {
      res.status(400)
      throw new Error("email deve ser string")
    }

    if (typeof password !== "string") {
      res.status(400)
      throw new Error("password deve ser string")
    }


    if (typeof type !== "string") {
      res.status(400)
      throw new Error("type deve ser string")
    }

    const newUsers: { id: string, name: string, email: string, password: string, type: string } = {
      id,
      name,
      email,
      password,
      type

    }
    await db("users").insert(newUsers)
    res.status(200).send("Cadastro realizado con suseso")
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


    const result = await db.select("*").from("purchase")
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
    const purchaseId = req.body.purchaseId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    const buyer_id = req.body.buyer_id
    
    console.log(buyer_id)

   /*if (typeof userId !== "string") {
      res.status(400)
      throw new Error("user deve ser string")
    }*/

    if (typeof productId !== "string") {
      res.status(400)
      throw new Error("product deve ser number")
    }


    if (typeof quantity !== "number") {
      res.status(400)
      throw new Error("quantity deve ser number")
    }


    if (typeof totalPrice !== "number") {
      res.status(400)
      throw new Error("totalPrice deve ser number")
    }


    if (typeof buyer_id !== "string") {
      res.status(400)
      throw new Error("buyer_id deve ser string")
    }

    
    if (typeof purchaseId !== "string") {
      res.status(400)
      throw new Error("product deve ser number")
    }
      const newPurchase: { id: string, productId: string, quantity: number, totalPrice: number, buyer_id: string } = {
      id: purchaseId,
      productId,
      quantity,
      totalPrice,
      buyer_id
    }
    await db("purchase").insert(newPurchase)
    res.status(200).send("Cadastro realizado con suseso")



  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})


app.delete("/users/:id", async (req: Request, res: Response) => {
  try {

    const idToDelete = req.params.id

    const [users] = await db("users").where({ id: idToDelete })
    if (!users) {
      throw new Error("user no encontrado")
    }
    await db("users").delete().where({ id: idToDelete })

    res.status(201).send("user  com sucesso")
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
  };
})

//PUT -Editar account by id
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newid = req.body.id as string | undefined
    const newemail = req.body.email as string | undefined
    const newpassword = req.body.password as string | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined
    
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


    if (newType !== undefined) {
      if (newType !== ACCOUNT_TYPE.GOLD &&
        newType !== ACCOUNT_TYPE.PLATINUM &&
        newType !== ACCOUNT_TYPE.BLACK) {

        res.status(400)
        throw new Error("type deve ser um tipo valido")
      }
    }

    const [accountToEdit] = await db.raw(` SELECT * FROM users where id = "${id}"`)
    if (accountToEdit) {
      accountToEdit.name = newName || accountToEdit.name
      accountToEdit.id = newid || accountToEdit.id
      accountToEdit.email = newemail || accountToEdit.email
      accountToEdit.password = newpassword || accountToEdit.password
      await db("users").update(accountToEdit).where({ id })
    } 



    res.status(200).send("user cadastrado com sucesso")
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

    const [accountToEdit] = await db.raw(` SELECT * FROM productos where id = "${id}";`)
    if (accountToEdit) {
      const newAcount = {
        id : newId || accountToEdit.id,
        name : newOwnerName || accountToEdit.name,
        preco : newPreco || accountToEdit.preco,
        categoria : newCategoria || accountToEdit.categoria
      }
      await db("productos").update(newAcount).where({ id })
    }


    res.status(201).send("Producto cadastrado com sucesso")
  
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
      res.send("error inesperado!")
    }
    res.send(error.message)
  }
})


app.delete("/productos/:id", async (req: Request, res: Response) => {
  try {

    const idToDelete = req.params.id

    const [productos] = await db("productos").where({ id: idToDelete })
    if (!productos) {
      throw new Error("user no encontrado")
    }
   
     await db("productos").del().where({ id: idToDelete })
    
    res.status(200).send("Producto deleteado com sucesso")
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
      res.send("Unexpected error!");
    }
    res.send(error.message);
  }
});

app.delete("/purchase/:id", async (req: Request, res: Response) => {
  try {

    const idToDelete = req.params.id

    const [purchase] = await db("purchase").where({ id: idToDelete })
    if (!purchase) {
      throw new Error("user no encontrado")
    }
    await db("purchase").delete().where({ id: idToDelete })

    res.status(201).send("Producto deleteado com sucesso")
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
      res.send("Unexpected error!");
    }
    res.send(error.message);
  }
});