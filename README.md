# Financial Data Management System

##  Description
This project is a financial data management system developed for a client in the Colombian electric sector.  
It organizes disorganized Excel data from Fintech platforms such as **Nequi** and **Daviplata** into a normalized SQL database.  
The system includes:
- A relational model designed following **1NF, 2NF, and 3NF**.
- Bulk data loading from CSV files.
- A **CRUD** for managing customers.
- Advanced SQL queries to meet business needs.
- A minimal dashboard for data management.

---

## Technologies Used
- **MySQL** (Relational database)
- **Node.js** with **Express** (Backend API)
- **HTML, CSS, JavaScript** (Frontend)
- **Bootstrap** (UI framework)
- **Postman** (API testing)
- **Draw.io** (Database diagram)

---

## ⚙️ How to Run the Project

### 1. Database Setup
1. Create a new MySQL database:
   ```sql
   CREATE DATABASE lisa_sanchez_gosling;
   USE lisa_sanchez_gosling;
   ```
2. Run the `DDL.sql` script to create all tables.

### 2. Bulk Data Load from CSV
Make sure your CSV files (`customer.csv`, `platform.csv`, `invoice.csv`, `transaction.csv`) are in the allowed directory for MySQL (`secure_file_priv` path).  

Run:
```sql
LOAD DATA LOCAL INFILE '/path/customer.csv'
INTO TABLE customer
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(first_name, last_name, email, phone);

LOAD DATA LOCAL INFILE '/path/platform.csv'
INTO TABLE platform
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(platform_name);

LOAD DATA LOCAL INFILE '/path/invoice.csv'
INTO TABLE invoice
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(customer_id, invoice_date, total_amount, status);

LOAD DATA LOCAL INFILE '/path/transaction.csv'
INTO TABLE transaction
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(invoice_id, platform_id, transaction_date, amount);
```

---

## 📊 Database Normalization

### First Normal Form (1NF)
- Each field contains only atomic values.
- No repeating groups.

### Second Normal Form (2NF)
- All non-key attributes are fully dependent on the primary key.
- No partial dependencies.

### Third Normal Form (3NF)
- No transitive dependencies.
- All attributes depend only on the primary key.

**Tables:**
- **Customer** → Stores client information.
- **Platform** → Stores payment platforms.
- **Invoice** → Stores invoice details.
- **Transaction** → Stores payment transactions.

---

## 📌 Advanced SQL Queries

### 1. Total paid by each customer
```sql
SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    SUM(t.amount) AS total_paid
FROM customer c
JOIN invoice i ON c.customer_id = i.customer_id
JOIN transaction t ON i.invoice_id = t.invoice_id
GROUP BY c.customer_id, customer_name
ORDER BY total_paid DESC;
```

### 2. Pending invoices with customer and transaction info
```sql
SELECT 
    i.invoice_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    i.total_amount,
    COALESCE(SUM(t.amount), 0) AS total_paid,
    (i.total_amount - COALESCE(SUM(t.amount), 0)) AS amount_pending
FROM invoice i
JOIN customer c ON i.customer_id = c.customer_id
LEFT JOIN transaction t ON i.invoice_id = t.invoice_id
WHERE i.total_amount > COALESCE(SUM(t.amount), 0)
GROUP BY i.invoice_id, customer_name, i.total_amount
ORDER BY amount_pending DESC;
```

### 3. Transactions by platform
```sql
SELECT 
    p.platform_name,
    t.transaction_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    i.invoice_id,
    t.amount,
    t.transaction_date
FROM transaction t
JOIN platform p ON t.platform_id = p.platform_id
JOIN invoice i ON t.invoice_id = i.invoice_id
JOIN customer c ON i.customer_id = c.customer_id
WHERE p.platform_name = 'Nequi'  -- Change this value to filter by another platform
ORDER BY t.transaction_date DESC;
```

---

## 👤 Developer Info
- **Name:** Lisa Minelly Sanchez Diaz
- **Clan:** Gosling
