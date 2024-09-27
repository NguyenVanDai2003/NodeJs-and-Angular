
CREATE DATABASE `BTL1` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
use `BTL1`;

CREATE TABLE IF NOT EXISTS `account` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) not null,
  `email` VARCHAR(100) not null UNIQUE,
  `password` VARCHAR(100) not null,
  `role` varchar(50) not null default 'customer',
  `creaed_at` date DEFAULT current_timestamp(),
  `Last_login` datetime DEFAULT current_timestamp()
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) not null UNIQUE,
  `status` tinyint
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `product` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) not null,
  `price` float NOT NULL,
  `sale_price` float NULL default '0',
  `image` VARCHAR(200) not null,
  `category_id` int not null,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  `status` tinyint default '1' not null,
  `description` text not null,
  `created_at` date default current_timestamp()
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `favourite` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `account_id` int not null,
    FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  `product_id` int not null,
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  `created_at` date default current_timestamp()
) ENGINE = InnoDB;

insert into `category`(name, status)values
('Rau',1),
('Củ',1),
('Quả',1)

insert into `product`(`name`, price, sale_price, image, category_id,status,description)values
('Ổi',500000,400000,'http://localhost:3002/image/oi3.jpg',1,1,'Ổi quê thơm ngon'),
('Dâu tây',600000,330000,'http://localhost:3002/image/dau_tay1.jpg',3,1,'Ổi quê thơm ngon'),
('Ớt',500000,40000,'http://localhost:3002/image/ot.jpg',3,1,'Ổi quê thơm ngon'),
('Chuối',700000,300000,'http://localhost:3002/image/chuoi.webp',1,1,'Ổi quê thơm ngon'),
('Rau muống',800000,400000,'http://localhost:3002/image/rau_muong.jpg',1,1,'Ổi quê thơm ngon'),
('Củ cải',700000,350000,'http://localhost:3002/image/cu_cải.jpg',2,1,'Ổi quê thơm ngon'),
('Khoai tây ',200000,100000,'http://localhost:3002/image/khoai_tây.jpg',2,1,'Ổi quê thơm ngon'),
('Khoai lang',300000,150000,'http://localhost:3002/image/khoai_lang.jpg',2,1,'Ổi quê thơm ngon'),
('Cà chua',90000,45000,'http://localhost:3002/image/cà_chua.jpg',3,1,'Ổi quê thơm ngon'),
('Nho',900000,799000,'http://localhost:3002/image/nho_đen.jpeg',3,1,'Ổi quê thơm ngon')

  insert into account(name, email, password, role)values
  ('Admin', 'admin@gmail.com', '12345','admin'),
  ('Nguyễn Văn Đại', 'Dai@gmail.com', '12345','customer')