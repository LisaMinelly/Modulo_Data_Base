import fs from 'fs';
import csv from "csv-parser";
import pkg from "pg";

const { Pool } = pkg;

let inserts = [];

export const uploadCSVfromBack = async () => {
    const db = new Pool({
        host: "aws-1-sa-east-1.pooler.supabase.com",
        user: "postgres.tnybynzlsjaiyoogouap",
        password: "V1ctEXxr1DSOOwgj",
        database: "mysql",
        port: 6543,
        ssl: { rejectUnauthorized: false },
    });


    fs.createReadStream("customer.csv")
        .pipe(csv())
        .on("data", (row) => {
            const insertPromise = db.query(
                "INSERT INTO customer (id_customer, name, identificartion, direction, number_phone, email) VALUES ($1, $2, $3, $4, $5)",
                [row.id_customer, row.name, row.identification, row.direction, row.number_phone, row.email],
                (error, results) => {
                    if (error) throw error;
                    console.log(`Row insert: ${results.affectedRows}`);
                }
            );

            inserts.push(insertPromise);

            console.log(row);
            console.log("--");
        })
        .on("end", async () => {
            try {
                await Promise.all(inserts);
                console.log(`Inserts ${inserts.length} rows correctly.`);
            } catch (errors) {
                console.error("Error insert data:", errors);
            }
        });

    fs.createReadStream("invoice.csv")
        .pipe(csv())
        .on("data", (row) => {
            const insertPromise = db.query(
                "INSERT INTO billing (id_invoice, number_invoice, period, id_customer, invoiced_amount ) VALUES ($1, $2, $3, $4. $5)",
                [row.id_invoice, row.number_invoice, row.period, row.id_customer, row.invoiced_amount],
                (error, results) => {
                    if (error) throw error;
                    console.log(`Row insert: ${results.affectedRows}`);
                }
            );

            inserts.push(insertPromise);

            console.log(row);
            console.log("--");
        })
        .on("end", async () => {
            try {
                await Promise.all(inserts);
                console.log(`Inserts ${inserts.length} rows correctly.`);
            } catch (errors) {
                console.error("Error insert data:", errors);
            }
        });

    fs.createReadStream("transaction.csv")
        .pipe(csv())
        .on("data", (row) => {
            const insertPromise = db.query(
                "INSERT INTO transaction (id_transaction, date_hour, transaction_amount, transaction_status, transaction_type, id_invoice, id_platform, paid_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [row.id_transaction, row.date, row.amount, row.status, row.type, row.platform ],
                (error, results) => {
                    if (error) throw error;
                    console.log(`Row insert: ${results.affectedRows}`);
                }
            );

            inserts.push(insertPromise);

            console.log(row);
            console.log("--");
        })
        .on("end", async () => {
            try {
                await Promise.all(inserts);
                console.log(`Insert ${inserts.length} rows correctly.`);
            } catch (errors) {
                console.error("Error insert data:", errors);
            }
        });

    fs.createReadStream("platform.csv")
        .pipe(csv())
        .on("data", (row) => {
            const insertPromise = db.query(
                "INSERT INTO sales (id_platform, platform ) VALUES ($1, $2,)",
                [row.id_platform, row.platform],
                (error, results) => {
                    if (error) throw error;
                    console.log(`Row insert: ${results.affectedRows}`);
                }
            );

            inserts.push(insertPromise);

            console.log(row);
            console.log("--");
        })
        .on("end", async () => {
            try {
                await Promise.all(inserts);
                console.log(`Insert ${inserts.length} rows correctly .`);
            } catch (errors) {
                console.error("Error insert data:", errors);
            }
        });
};

