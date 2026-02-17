import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ProyectoAPI';

if (!uri) {
  console.error('MONGODB_URI no esta configurada en .env');
  process.exit(1);
}

async function main() {
  let client;
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    await client.connect();
    const db = client.db(dbName);
    await db.command({ ping: 1 });

    console.log(`Conexion OK a MongoDB. Base: ${dbName}`);
  } catch (error) {
    console.error('Conexion fallida:', error.message);
    process.exitCode = 1;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

main();
