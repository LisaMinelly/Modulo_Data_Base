CREATE TABLE customer(
id_customer INT PRIMARY KEY AUTO_INCREMENT,
name_customer VARCHAR(100) NOT NULL,
identification VARCHAR(20) UNIQUE NOT NULL,
direction TEXT,
number_phone VARCHAR(20),
email VARCHAR(50)
);

CREATE TABLE invoice(
id_invoice INT PRIMARY KEY AUTO_INCREMENT,
number_invoice VARCHAR(100) NOT NULL,
id_customer INT,
period DATE NOT NULL,
invoiced_amount DECIMAL(12,2) NOT NULL,
FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
);

CREATE TABLE platform(
id_platform INT PRIMARY KEY AUTO_INCREMENT,
name_platform VARCHAR(50)
);

CREATE TABLE transaction(
id_transaction INT PRIMARY KEY AUTO_INCREMENT,
transaction_code VARCHAR(50) UNIQUE NOT NULL,
date_hour TIMESTAMP NOT NULL,
transaction_status VARCHAR(50) NOT NULL,
transaction_type VARCHAR(50) NOT NULL,
id_invoice INT,
id_platform INT,
paid_amount DECIMAL(12,2) DEFAULT 0,
FOREIGN KEY (id_invoice) REFERENCES invoice(id_invoice),
FOREIGN KEY (id_platform) REFERENCES platform(id_platform)
);

