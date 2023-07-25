import db from "../infra/db/config";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log(`Listeaning on port ${PORT}!`);
    await db.raw("SELECT 1");
    console.log("Server is running!");
  } catch {
    console.log("Server is not running!");
  }
});