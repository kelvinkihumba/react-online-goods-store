DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(50) DEFAULT NULL,
  `l_name` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `admins` WRITE;
INSERT INTO `admins` VALUES
(1,'Katie','Tracy','Owner','birdandbee.kt@gmail.com','birdsRc00l'),
(2,'Alyssa','Wickman','Admin','admin1@gmail.com','pwd1'),
(3,'Kelvin','Kihumba','Admin','admin2@gmail.com','pwd2'),
(4,'Katie','Tracy','Admin','admin3@gmail.com','pwd3');
UNLOCK TABLES;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(100) DEFAULT NULL,
  `l_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_no` int NOT NULL AUTO_INCREMENT,
  `product` varchar(100) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `cust_id` int DEFAULT NULL,
  PRIMARY KEY (`order_no`),
  KEY `cust_id` (`cust_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `order` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_image` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` float(5,2) DEFAULT NULL,
  `quantity_available` int DEFAULT NULL,
  `available_for_sale` tinyint(1) DEFAULT NULL,
  `quantity_applies` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `products` WRITE;
INSERT INTO `products` (product_name, product_image, description, price, quantity_available, available_for_sale, quantity_applies) VALUES
('All-Ocassion Cupcakes (1 dozen)','..\\images\\cupcakes.png','Choose up to 2 flavors per dozen:  Funfetti (with Naturally Dyed Sprinkles), Chocolate Salted Caramel, Butterfly Chai, Hyperion Mocha, Chocolate Cookie Butter, German Chocolate, Lemon Curd',40.00,NULL,1,0),
('Arm-Knit Infinty Scarf','..\\images\\scarf.png','A homemade, arm-knit infinity scarf made from Lion Brand Wool-Ease Yarn.  Indicate desired color in order request. ',15.00,0,1,1),
('Bad Boys','..\\images\\bad_boys.png','Salted Caramel Brown Butter Chocolate Chip Cookies, or Bad Boys to make it faster to say. The full name is self-explanatory - the same brown butter chocolate chip cookies I started making, but with homemade salted caramel sauce drizzled into the dough.',2.50,NULL,1,0),
('Basil + Parm + Sungold Thumbprints','..\\images\\bps_thumbprints.png','Made using ingredients grown in my garden, these savory cookies are a buttery bite with a pop of sweetness from the Sungold tomatoes. Basil + Parmesan cheese add an herby and salty flavor to the “cookie”. These would be amazing as an appetizer or on a grazing board!',1.50,NULL,1,0),
('Berry Citrus Spice Jam (4 oz.)','..\\images\\berry_citrus_spice_jam.png','A sweet + cozy blend of cranberries, Michigan strawberries, orange zest + pulp, and warm spices.',8.00,5,1,1),
('Blood Orange + Thyme Marmalade (4 oz.)','..\\images\\blood_orange_thyme_jam.png','Perfectly sweet, a little bitter, + a little savory from the fresh thyme I grow at my home. Not your grandma’s pithy, super bitter marmalade.',8.00,0,0,1),
('Brown Butter Chocolate Chip Cookies','..\\images\\bbcc_cookies.png','A fan-fave wherever they go, made with a little extra time + love with that browned butter. Perfectly golden on the outside, tender + melt-in-your mouth like packed brown sugar on the inside. Bring them to your next work meeting, treat yourself or a friend, + always add them to a gift basket if you order one!',2.00,NULL,1,0),
('Brown Butter Salted Maple Blondies','..\\images\\bbsmblondies.png','Her name is long but what you see is what you get. Toasty brown butter + sweet Michigan maple syrup give these fugdy blondies their addictive flavor. But what sets it all off is a sprinkling of flakey Maldon salt over the maple icing on top.',2.00,NULL,1,0),
('Chamomile Infused Face + Body Oil','..\\images\\chamomile_oil.png','Skin-nourishing jojoba, sweet almond, and grapeseed oils are cold-infused with air-dried German Chamomile flowers grown in my backyard. Vitamin E, lavender and rosemary essential oils round out this non-comedogenic product. These simple, wholesome ingedients are combined and poured into 2 oz. amber glass bottles with an eye dropper. Store in a cool, dry place for best results.',20.00,0,0,1),
('Custom Embroidered Felt Ornament','..\\images\\ornament.png','A custom embroidered felt ornament. Let me know which letter you would like me to embroider. I can also do variations on this design! Additional details may be subject to extra charges.',18.00,NULL,0,0),
('Embroidered Corner Bookmarks','..\\images\\bookmark.png','Hand-embroidered corner bookmarks made of felt. Current selection of felt colors includes light blue, sage green, and camel brown. Choose 1-3 colors for the design (roses/flowers or other design - I\'ll make it work!).',20.00,NULL,1,0),
('Gift Baskets','..\\images\\basket.png','Price ranges from $50-$100+ depending on what items you would like in the basket. Some items I have included in previous baskets include my homemade jams, baked goods + dry goods, Fentiman\'s sodas, Rustic Bakery Sea Salt crackers, and Rose & Perry candles.  I favor tea towels instead of paper balls as filler in the bottom and I use compostable wrapping on the baked goods. A handwritten card can be included upon request. Fresh flowers or foliage from my garden is included in all baskets.',50.00,NULL,1,0),
('Jam Wedding/Shower Favors','..\\images\\wedding_favors.png','Minimum order of 48 jars needed for 15% off order. Flavors vary by season. At least one month advance notice is needed.',8.00,NULL,1,0),
('Lavender, Cedarwood + Peppermint Rollerball','..\\images\\rollerball.png','10 ml rollerball contains jojoba oil, DoTerra brand Lavender, Cedarwood, and Peppermint essential oils.  This is a calming blend to roll onto your pressure points to promote relaxation.',15.00,1,1,1),
('Market Loaf','..\\images\\market_loaf.png','Flavor will vary depending on what\'s in season at the farmer’s market each week!  Past flavors include Peach Zucchini and Blueberry Crumble.',8.50,NULL,1,0),
('Morning Glory Bread','..\\images\\morning_glory_bread.png','A yummy combination of apples, carrots, coconut, walnuts, crystallized ginger, and spices. The perfect loaf if you don\'t like things that are too sweet.',8.50,NULL,1,0),
('Oh Hot Jam (4 oz.)','..\\images\\plum_ginger_hot_jam.png','Peach jam, infused with heat from habanero peppers.',8.00,0,0,1),
('Pearberry Jam (4 oz.)','..\\images\\pearberry_jam.png','This jam is packed full of local Michigan Bosc pears and cranberries, with a little bit of orange + cinnamon to warm it up a bit. My husband says it tastes like Hawaiian Punch, I say it tastes yummy.',8.00,0,1,1),
('Plum Ginger Jame (4 oz.)','..\\images\\plum_ginger_hot_jam.png','Red plum jam with fresh ginger grated in.',8.00,0,0,1);
UNLOCK TABLES;