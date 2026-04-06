import { Pool } from 'pg';

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Function to initialize the database tables
const initializeTables = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users (\n        id SERIAL PRIMARY KEY,\n        username VARCHAR(50) UNIQUE NOT NULL,\n        password VARCHAR(100) NOT NULL,\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );`;
    await pool.query(queryText);
};

// Initialize tables
initializeTables().catch(e => console.error(e));

export default pool;