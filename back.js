import express, { json } from 'express';
import { uploadCSVfromBack } from "./helpers/helpers.js"
import pkg from 'pg';
import cors from 'cors';
const { Pool } = pkg;



const PORT = 3000;

const app = express();
app.use(cors());
app.use(json());


//Mysql connection
const db = new Pool({
    host: "aws-1-sa-east-1.pooler.supabase.com",
    user: "postgres.tnybynzlsjaiyoogouap",
    password: "V1ctEXxr1DSOOwgj",
    database: "Mysql",
    port: 6543,
    ssl: { rejectUnauthorized: false },
});

//If to rewiew cocnnection works or not
db.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Successful connection:', result.rows);
  }
});

//Post endpoint
app.post('/customers', (req, res) => {
  const { id_customers, name, direction, number_phone, email } = req.body;

  //We made an insert query on mySQL
  db.query(
      'INSERT INTO customers (id_customers, name, direction, number_phone, email) VALUES ($1, $2, $3, $4, $5)',
      [id_customers, name, direction, number_phone, email],
      (errors) => {
        if (errors) {
          console.error('Error inserting customer:', errors);
          return res.status(500).json({ error: 'Error inserting employee', detalle: errors.message });
        }
        res.json({ message: 'Customer successfully added' });
      }
  );
});

// Get endpoint
app.get('/customers/:id_customers', async (req, res) => {
  const { id_customers } = req.params;
  try {
    //We made a Select query on mySQL
    const { rows } = await db.query('SELECT * FROM customers WHERE id_customers = $1', [id_customers]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'customer not found' });
    }
    res.json(rows[0]); //On only one of them. Not on each one
  } catch (errors) {
    res.status(500).json({ error: 'Server Error', details: errors });
  }
});

//Put endpoint
app.put('/customers/:id_customers', (req, res) => {
  const { id_customers } = req.params; //It directly extracts the cc parameter from the URL received in the request.
  const { name, direction, number_phone, email } = req.body; //It directly extracts all the vars from the body (FrontEnd)

  const sql = 'UPDATE customers SET name = $1, address = $2, phone = $3, email = $4 WHERE id_customers = $5';
  const values = [name, direction, number_phone, email, id_customers]; //We enter the vars values on mySQL

  // Put query on mySQL
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating customer:', errors);
      return res.status(500).json({ error: 'Error updating the customer' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Successfully updated customer' });
  });
});

//Delete endpoint
app.delete('/customers/:id_customers', (req, res) => {
  const { id_customers } = req.params;

  const sql = 'DELETE FROM customers WHERE id_customers = $1';

  db.query(sql, [id_customers], (errors, result) => {
    if (errors) {
      console.error('Error deleting customers:', errors);
      return res.status(500).json({ error: 'Error deleting customers' });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer successfully deleted' });
  });
})

//Starts the server on port 3000 and logs the message '
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}/customers`));


app.get("/csv", async (req, res) => {
  try {
    await uploadCSVfromBack();
    res.json({ success: true, message: "CSV subido a la base de datos" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});