Create database bird_and_bee;

Create table products(
product_id int NOT NULL AUTO_INCREMENT,
product_name varchar(100),
product_image varchar(100),
description varchar(500),
price float(5,2),
quantity_available int(10),
available_for_sale boolean, 
quantity_applies Boolean,
PRIMARY KEY (product_id) );

Create table customer(
ID int NOT NULL AUTO_INCREMENT,
f_name varchar(100),
l_name varchar(100),
email varchar(100),
password varchar(100),
PRIMARY KEY (ID));

Create table orders(
order_no int NOT NULL AUTO_INCREMENT,
product varchar(100),
amount int(10),
cust_id int(10),
status int(1),
type int(1),
PRIMARY KEY (order_no),
FOREIGN KEY (cust_id) references customer(ID)
FOREIGN KEY (product) references products(product_id));

Create table admins(
ID int NOT NULL AUTO_INCREMENT,
f_name varchar(100),
l_name varchar(100),
email varchar(100),
password varchar(100),
PRIMARY KEY (ID));


GRANT ALL PRIVILEGES ON *.* TO 'admin'@'134.122.79.252';