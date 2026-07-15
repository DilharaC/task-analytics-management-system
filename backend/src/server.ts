import app from './app';
import { env } from './config/env';
import { pool } from './db/pool';

// pool.query('SELECT NOW()')
//   .then(() => {
//     console.log('Database connected successfully');
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err.message);
//   });

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});