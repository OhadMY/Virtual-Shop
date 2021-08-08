CREATE DATABASE fourth_project;

USE fourth_project;

CREATE TABLE users (
userId INT,
firstName VARCHAR(60),
lastName VARCHAR(60),
eMail VARCHAR(60),
userPassword VARCHAR(60),
city VARCHAR(60),
street VARCHAR(60),
userType BOOL NOT NULL DEFAULT 0,
PRIMARY KEY (userId)
);

INSERT INTO users (userId, firstName, lastName, eMail, userPassword, city, street, userType) VALUES
(123456789,"Admin","Istrator","AdminTestAcc@gmail.com","$2b$10$ymxgUG0S7Are6alfENhILeZq9KZALrkM04Uw27tuKzWWO4XoqfiGa",null,null,1),
(311286074,"Ohad","Mor Yosef","Ohad.Mor.Yosef@gmail.com","$2b$10$ymxgUG0S7Are6alfENhILeZq9KZALrkM04Uw27tuKzWWO4XoqfiGa","Nahariya","Yefe Nof",0);

CREATE TABLE prodCategory (
prodCategoryId INT AUTO_INCREMENT,
categoryName VARCHAR(60),
PRIMARY KEY (prodCategoryId)
);

INSERT INTO prodCategory (categoryName) VALUES ("Dairy"),("Bakery"),("Meat"),("Soft drinks"),("Frozen");

CREATE TABLE products (
prodId INT AUTO_INCREMENT,
categoryId INT,
prodName VARCHAR(60),
prodPrice VARCHAR(10) ,
prodImage VARCHAR(255),
FOREIGN KEY (categoryId) REFERENCES prodCategory(prodCategoryId),
PRIMARY KEY (prodId)
);

INSERT INTO products (categoryId,prodName,prodPrice,prodImage) VALUES 
(2,"4 Bistro Brioche Burger Buns","3","http://localhost:1000/images/Bakery/4 Bistro Brioche Burger Buns.jpg"),
(2,"6 Sliced Hot Dog Rolls","4","http://localhost:1000/images/Bakery/6 Sliced Hot Dog Rolls.jpg"),
(2,"6 Tortilla Wraps","5","http://localhost:1000/images/Bakery/6 Tortilla Wraps.jpg"),
(2,"Sliced White Bread","2","http://localhost:1000/images/Bakery/Sliced White Bread.jpg"),
(1,"Butterly Spread 500g","3.50","http://localhost:1000/images/Dairy/Butterly Spread 500g.jpg"),
(1,"Mozzarella 125g","4.70","http://localhost:1000/images/Dairy/Mozzarella 125g.jpg"),
(1,"Natural Yogurt 500g","2.50","http://localhost:1000/images/Dairy/Natural Yogurt 500g.jpg"),
(1,"Semi Skimmed Milk 2L","4.70","http://localhost:1000/images/Dairy/Semi Skimmed Milk 2L.jpg"),
(3,"Wagyu Beef Burger 170g","24.50","http://localhost:1000/images/Meat/Wagyu Beef Burger 170g.jpg"),
(3,"Range Pork Chops 520g","19.25","http://localhost:1000/images/Meat/Range Pork Chops 520g.jpg"),
(3,"British Rack of Lamb 375g","18.75","http://localhost:1000/images/Meat/British Rack of Lamb 375g.jpg"),
(3,"Field Tuna Steak 300g","16.30","http://localhost:1000/images/Meat/Field Tuna Steak 300g.jpg"),
(4,"Coca Cola 1.5L","2.70","http://localhost:1000/images/Soft drinks/Coca Cola 1.5L.jpg"),
(4,"Pepsi Max No Sugar 2L","2.30","http://localhost:1000/images/Soft drinks/Pepsi Max No Sugar 2L.jpg"),
(4,"Lipton Ice Tea Peach 1.25L","3","http://localhost:1000/images/Soft drinks/Lipton Ice Tea Peach 1.25L.jpg"),
(4,"Sprite Lemon Lime 2L","2.50","http://localhost:1000/images/Soft drinks/Sprite Lemon Lime 2L.jpg"),
(5,"10 Garlic Bread Slices","7.50","http://localhost:1000/images/Frozen/10 Garlic Bread Slices.jpg"),
(5,"Onion Rings","8.30","http://localhost:1000/images/Frozen/Onion Rings.jpg"),
(5,"Ristorante Mozzarella Pizza","10.50","http://localhost:1000/images/Frozen/Ristorante Mozzarella Pizza.jpg"),
(5,"6 Classico Ice Cream Cone","9","http://localhost:1000/images/Frozen/6 Classico Ice Cream Cone.jpg");

SELECT * FROM products WHERE categoryId=2;

CREATE TABLE shoppingCarts (
shoppingCartId INT AUTO_INCREMENT,
cartCreationTime DATETIME DEFAULT NOW() NOT NULL, 
userCartId INT,
FOREIGN KEY (userCartId) REFERENCES users(userId),
cartStatus BOOL NOT NULL DEFAULT 0,
PRIMARY KEY (shoppingCartId)
);

INSERT INTO shoppingCarts (userCartId) VALUES (311286074);
SELECT * FROM shoppingCarts;

-- start fix here
CREATE TABLE prodInCart (
prodInCartId INT AUTO_INCREMENT,
quantity INT,
cartId INT,
FOREIGN KEY (cartId) REFERENCES shoppingCarts(shoppingCartId),
prodCartId INT,
FOREIGN KEY (prodCartId) REFERENCES products(prodId),
PRIMARY KEY (prodInCartId)
);
-- end fix here

INSERT INTO ProdInCart (cartId,quantity,prodCartId) VALUES (1,4,3);
select * from ProdInCart;
SELECT prodInCart.cartId,prodInCart.prodInCartId,prodInCart.quantity,products.prodPrice, SUM(prodInCart.quantity * products.prodPrice) AS Total 
FROM prodInCart JOIN
     products ON 
     prodInCart.prodCartId = products.prodId
     -- groupby prodInCartId sums up each product in every cart
     -- groupby cartId sums up all products in each cart
GROUP BY prodInCart.cartId;
DELETE FROM prodInCart WHERE prodInCartId = 2;

CREATE TABLE orders (
orderId INT AUTO_INCREMENT,
userId INT,
FOREIGN KEY (userId) REFERENCES users(userId),
cartId INT,
FOREIGN KEY (cartId) REFERENCES shoppingCarts(shoppingCartId),
totalPrice INT,
deliveryCity VARCHAR(60),
deliveryStreet VARCHAR(60),
deliveryDate DATETIME,
orderCreationTime DATETIME DEFAULT NOW() NOT NULL,
CVV VARCHAR(4),
PRIMARY KEY (orderId)
);