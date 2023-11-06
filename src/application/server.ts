import app from './app';
import dotenv from 'dotenv';
import db from './../infra/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log(`Listeaning on port ${PORT}!`);
    await db.$connect();
    console.log('DB is running!');
  } catch {
    console.log('DB is not running!');
  }
});