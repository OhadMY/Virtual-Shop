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

INSERT INTO prodCategory (categoryName) VALUES ("Dairy"),("Bakery"),("Meat"),("Drinks"),("Frozen");

CREATE TABLE products (
prodId INT AUTO_INCREMENT,
categoryId INT,
prodName VARCHAR(60),
prodPrice INT,
prodImage VARCHAR(255),
FOREIGN KEY (categoryId) REFERENCES prodCategory(prodCategoryId),
PRIMARY KEY (prodId)
);

INSERT INTO products (categoryId,prodName,prodPrice,prodImage) VALUES 
(2,"4 Bistro Brioche Burger Buns",3,"http://localhost:1000/images/Bakery/4BistroBriocheBurgerBuns.jpg"),
(2,"6 Sliced Hot Dog Rolls",4,"http://localhost:1000/images/Bakery/6SlicedHotDogRolls.jpg"),
(2,"6 Tortilla Wraps",5,"http://localhost:1000/images/Bakery/6TortillaWraps.jpg"),
(2,"Sliced White Bread",2,"http://localhost:1000/images/Bakery/SlicedWhiteBread.jpg"),
(1,"Butterly Spread 500g",3.50,"http://localhost:1000/images/Dairy/ButterlySpread500g.jpg"),
(1,"Mozzarella 125g",4.70,"http://localhost:1000/images/Dairy/Mozzarella125g.jpg"),
(1,"Natural Yogurt 500g",2.50,"http://localhost:1000/images/Dairy/NaturalYogurt500g.jpg"),
(1,"Semi Skimmed Milk 2L",4.70,"http://localhost:1000/images/Dairy/SemiSkimmedMilk2L.jpg"),
(3,"Wagyu Beef Burger 170g",24.50,"http://localhost:1000/images/Meat/WagyuBeefBurger170g.jpg"),
(3,"Range Pork Chops 520g",19.25,"http://localhost:1000/images/Meat/RangePorkChops520g.jpg"),
(3,"British Rack of Lamb 375g",18.75,"http://localhost:1000/images/Meat/BritishRackofLamb375g.jpg"),
(3,"Field Tuna Steak 300g",16.30,"http://localhost:1000/images/Meat/FieldTunaSteak300g.jpg"),
(4,"Coca Cola 1.5L",2.70,"http://localhost:1000/images/Drinks/CocaCola1.5L.jpg"),
(4,"Pepsi Max No Sugar 2L",2.30,"http://localhost:1000/images/Drinks/PepsiMaxNoSugar2L.jpg"),
(4,"Lipton Ice Tea Peach 1.25L",3,"http://localhost:1000/images/Drinks/LiptonIceTeaPeach1.25L.jpg"),
(4,"Sprite Lemon Lime 2L",2.50,"http://localhost:1000/images/Drinks/SpriteLemonLime2L.jpg"),
(5,"10 Garlic Bread Slices",7.50,"http://localhost:1000/images/Frozen/10GarlicBreadSlices.jpg"),
(5,"Onion Rings",8.30,"http://localhost:1000/images/Frozen/OnionRings.jpg"),
(5,"Ristorante Mozzarella Pizza",10.50,"http://localhost:1000/images/Frozen/RistoranteMozzarellaPizza.jpg"),
(5,"6 Classico Ice Cream Cone",9,"http://localhost:1000/images/Frozen/6ClassicoIceCreamCone.jpg");

CREATE TABLE shoppingCarts (
shoppingCartId INT AUTO_INCREMENT,
cartCreationTime DATETIME DEFAULT NOW() NOT NULL, 
userCartId INT,
FOREIGN KEY (userCartId) REFERENCES users(userId),
cartStatus BOOL NOT NULL DEFAULT 0,
PRIMARY KEY (shoppingCartId)
);

INSERT INTO shoppingCarts (userCartId) VALUES (311286074);

CREATE TABLE prodInCart (
prodInCartId INT AUTO_INCREMENT,
quantity INT,
cartId INT,
FOREIGN KEY (cartId) REFERENCES shoppingCarts(shoppingCartId),
prodCartId INT,
FOREIGN KEY (prodCartId) REFERENCES products(prodId),
PRIMARY KEY (prodInCartId)
);

INSERT INTO ProdInCart (cartId,quantity,prodCartId) VALUES (1,4,3);
UPDATE ProdInCart SET quantity=quantity-1 WHERE prodInCartId = 1;
SELECT prodInCart.cartId,prodInCart.prodInCartId,prodInCart.prodCartId,prodInCart.quantity,products.prodPrice, SUM(prodInCart.quantity * products.prodPrice) AS Total 
FROM prodInCart JOIN
     products ON 
     prodInCart.prodCartId = products.prodId
     WHERE cartId=1
     -- groupby prodInCartId sums up each product in every cart
     -- groupby cartId sums up all products in each cart
GROUP BY prodInCart.prodInCartId;
DELETE FROM prodInCart WHERE prodInCartId = 1;
select * from ProdInCart;
SELECT * FROM shoppingCarts;
SELECT * FROM products;
SELECT * FROM prodCategory;

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