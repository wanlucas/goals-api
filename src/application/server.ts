import db from '../infra/db';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log(`Listeaning on port ${PORT}!`);
    await db.authenticate();
    console.log('DB is running!');
  } catch {
    console.log('DB is not running!');
  }
});