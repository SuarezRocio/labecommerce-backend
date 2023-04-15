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

INSERT INTO users(id , name, email, password, type )
VALUES ("u001",  "Raquel de Solange", "solange@gmail.com", "2DFSAFAS08", "BLACK");

SELECT * FROM users;

SELECT id FROM users
ORDER BY id DESC;

SELECT * FROM users;

CREATE TABLE productos(
id TEXT PRIMARY KEY UNIQUE NOT NULL, 
name TEXT NOT NULL,
categoria TEXT NOT NULL,
preco TEXT,
img TEXT,
descripcao TEXT
);



DROP TABLE productos;


SELECT * FROM productos;

INSERT INTO productos(id , name, categoria, preco, img, descripcao)
VALUES 
("prod001",  "alho","alimento" , 7 , "https://ibb.co/BnCvW1S", "descripcao"),
("prod006",  "batata","alimento" , 6 ,"https://ibb.co/vwxd2jL", "descripcao"),
("prod008",  "banana","alimento" , 4 ,"https://ibb.co/FKq7B6j", "descripcao"),
("prod0010",  "cebola","alimento" , 2 ,"https://ibb.co/yyXPBrZ", "descripcao");


UPDATE productos
SET preco = 7
WHERE id = "prod001";


SELECT * FROM productos;

SELECT name FROM productos
ORDER BY name DESC;


DELETE FROM productos WHERE id = 1;


SELECT * FROM productos;


INSERT INTO users(id, name, email, password, type)
VALUES
("u002",  "Ramona de Solange", "solange@gmail.com","2DFSAFAS08", "OURO");


INSERT INTO productos (id , name, categoria, preco, img , descripcao)
VALUES
("prod002",  "tomate","alimento" , 10 ,"https://ibb.co/2Yg3pJ6", "descripcao"),
("prod003",  "manga","alimento" , 6 ,"https://ibb.co/j60XDHt", "descripcao");


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
    created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
    FOREiGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM purchase;


DROP TABLE purchase;


INSERT INTO users (id, name, email, password, type)
VALUES("u007", "ricardo", "ricardo@gmail.com", "ricardo120",  "PLATINO"),
("u008", "mariana", "mariana@gmail.com", "mariana120", "OURO"),
("u009", "karen", "karen@gmail.com", "karen120", "BLACK"),
( "u0010", "lurdes", "lurdes@gmail.com", "lurdes123", "PLATINO");

SELECT * FROM users;


DROP TABLE users;

UPDATE users 
SET password = "lurdes123"
WHERE id = "u0010" ;



INSERT INTO purchase (id, productId, quantity, totalPrice, buyer_id)
VALUES
("pur001", "prod001" , 4 , 10 , "u001"),
("pur002", "prod002" , 4 , 10 , "u002"),
("pur007", "prod003" , 7 , 20 , "u007"),
("pur008", "prod006" , 4 , 30 , "u008"),
("pur009", "prod008" , 8 , 40 , "u009"),
("pur0010","prod0010", 7 , 20 , "u0010");

DROP TABLE purchase;

SELECT * FROM purchase;




SELECT 
users.id AS usersId,
buyer_id AS  buyer_id,
purchase.totalPrice AS totalPrice
FROM users
INNER JOIN  purchase
ON purchase.buyer_id = users.id;

SELECT 
users.id AS usersId,
buyer_id AS  buyer_id,
purchase.totalPrice AS totalPrice
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
("pur001", "prod001"),
("pur002", "prod002"),
("pur007", "prod003"),
("pur008", "prod006"),
("pur009", "prod008"),
("pur0010","prod0010");

 

/*UPDATE purchase 
SET preco = 17
WHERE id = "pur0010";*/


SELECT * FROM purchase_purchaser_producto;

SELECT * FROM productos
INNER JOIN purchase_purchaser_producto
ON purchase_purchaser_producto.purchase_id = productos.id;


SELECT * FROM productos
LEFT JOIN purchase_purchaser_producto
ON purchase_purchaser_producto.purchase_id = productos.id;



/*SELECT 
purchase_purchaser_producto.purchase_id AS purchaseId,
purchase_purchaser_producto.producto_id AS productoId,
productos.name AS productos
FROM purchase_purchaser_producto
LEFT JOIN productos
ON purchase_purchaser_producto.purchase_id = productos.id;*/


SELECT  
productos.name, 
productos.preco,
purchase.quantity,
purchase.totalPrice,
purchase.buyer_id
FROM purchase
INNER JOIN purchase_purchaser_producto ON purchase.id = purchase_purchaser_producto.purchase_id
INNER JOIN productos ON purchase_purchaser_producto.producto_id = productos.id;    


/*SELECT
    purchases.id as purchaseId,
    purchases.buyer as buyerId,
    products.id AS productId,
    products.name AS productName,
    purchases_products.quantity AS productQuantity,
    products.price AS productPrice,
    purchases.total_price
FROM purchases
    INNER JOIN purchases_products ON purchases.id = purchases_products.purchase_id
    INNER JOIN products ON purchases_products.product_id = products.id;*/