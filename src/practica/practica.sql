-- Active: 1681156152776@@127.0.0.1@3306
CREATE TABLE users(
id TEXT PRIMARY KEY UNIQUE NOT NULL, 
name TEXT NOT NULL,
email TEXT NOT NULL,
password TEXT NOT NULL,
type TEXT NOT NULL
);

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users(id , name, email, password, type)
VALUES ("1",  "Raquel de Solange", "solange@gmail.com", "2DFSAFAS08", "BLACK");

SELECT * FROM users;

SELECT id FROM users
ORDER BY id DESC;

SELECT * FROM users;

CREATE TABLE productos(
id TEXT PRIMARY KEY UNIQUE NOT NULL, 
name TEXT NOT NULL,
categoria TEXT NOT NULL,
preco TEXT
);



DROP TABLE productos;


SELECT * FROM productos;

INSERT INTO productos(id , name, categoria, preco)
VALUES 
("1",  "alho","alimento" , 7 ),
("6",  "batata","alimento" , 6 ),
("8",  "banana","alimento" , 4 ),
("10",  "cebola","alimento" , 2 );


SELECT * FROM productos;

SELECT name FROM productos
ORDER BY name DESC;


DELETE FROM productos WHERE id = 1;


SELECT * FROM productos;


INSERT INTO users(id, name, email, password, type)
VALUES
("2",  "Ramona de Solange", "solange@gmail.com","2DFSAFAS08", "OURO");


INSERT INTO productos (id , name, categoria, preco)
VALUES
("2",  "tomate","alimento" , 10 ),
("3",  "manga","alimento" , 6 );


DROP TABLE productos;


SELECT * FROM users
INNER JOIN productos 
ON productos.productos.id = users.id;


CREATE TABLE purchase (
    id TEXT PRIMARY KEY NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    totalPrice REAL NOT NULL,  
    buyer_id TEXT NOT NULL,
    FOREiGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE

);

SELECT * FROM purchase;


DROP TABLE purchase;


INSERT INTO users (id, name, email, password, type)
VALUES("7", "ricardo", "ricardo@gmail.com", "ricardo120",  "PLATINO"),
("8", "mariana", "mariana@gmail.com", "mariana120", "OURO"),
("9", "karen", "karen@gmail.com", "karen120", "BLACK"),
( "10", "lurdes", "lurdes@gmail.com", "lurdes123", "PLATINO");

SELECT * FROM users;


DROP TABLE users;


INSERT INTO purchase (id, productId, quantity, totalPrice, buyer_id)
VALUES
("1", "1" , 4 , 10 , "1"),
("2", "2" , 4 , 10 , "2"),
("7", "3" , 7 , 20 , "7"),
("8", "6" , 4 , 30 , "8"),
("9", "8" , 8 , 40 , "9"),
("10","10", 7 , 20 , "10");

DROP TABLE purchase;

SELECT * FROM purchase;


SELECT 
users.id AS usersId,
buyer_id AS  buyer_id,
purchase.totalPrice,
purchase.quantity
FROM users
INNER JOIN  purchase
ON purchase.buyer_id = users.id;

SELECT 
users.id AS usersId,
buyer_id AS  buyer_id,
purchase.totalPrice,
purchase.quantity
FROM users
LEFT JOIN  purchase
ON purchase.buyer_id = users.id;


CREATE TABLE purchase_purchaser_producto (
    purchase_id TEXT NOT NULL,
    producto_id TEXT NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchase(id) ON DELETE CASCADE
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);


DROP TABLE purchase_purchaser_producto;


INSERT INTO purchase_purchaser_producto (purchase_id , producto_id)
VALUES
("1", "1"),
("2", "2"),
("7", "3"),
("8","6"),
("9","8"),
("10","10");

SELECT * FROM purchase_purchaser_producto;

/*el inner join aparece vacio*/
SELECT * FROM productos
INNER JOIN purchase_purchaser_producto
ON purchase_purchaser_producto.purchase_id = productos.id;


/*no me esta uniendo el id del producto con el id de la compra me devuelve valor nulo*/
SELECT * FROM productos
LEFT JOIN purchase_purchaser_producto
ON purchase_purchaser_producto.purchase_id = productos.id;

/*no encuentra purchase.id*/
SELECT 
purchase_purchaser_producto.purchase_id AS purchaseId,
purchase_purchaser_producto.producto_id AS productoId,
productos.name AS productos
FROM productos
LEFT JOIN purchase_purchaser_producto
ON purchase_purchaser_producto.purchase_id = productos.id
INNER JOIN productos AS productos_buy
ON purchase_purchaser_producto.purchase_id = productos_buy.id;