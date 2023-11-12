const { Pool } = require('pg')

const connectionESQL = "postgres://boxbfjeb:CJiYOTkbJKFZtA-9VtXGERzDYBqvr_uv@bubble.db.elephantsql.com/boxbfjeb"

const pool = new Pool({
    connectionString: connectionESQL,
  });

const tableName = 'users'  

  // Create the users table if it doesn't exist
  pool.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `, (err, result) => {
    if (err) {
      console.error(`Error creating the ${tableName} table`, err);
    } else {
      console.log(`${tableName} table created successfully`);
    }
  });
  
  // Seed the table with initial data
  // pool.query(`
  //   INSERT INTO users (username, email)
  //   VALUES
  //     ('user1', 'user1@example.com'),
  //     ('user2', 'user2@example.com')
  // `, (err, result) => {
  //   if (err) {
  //     console.error('Error seeding the users table', err);
  //   } else {
  //     console.log('Data seeded successfully');
  //   }
  // });