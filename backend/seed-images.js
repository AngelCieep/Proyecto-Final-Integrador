import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ProyectoAPI';

if (!uri) {
  console.error('MONGODB_URI no esta configurada en .env');
  process.exit(1);
}

const bossesImages = {
  'Artorias the Abysswalker': 'https://placehold.co/600x800?text=Artorias+the+Abysswalker',
  'Ornstein and Smough': 'https://placehold.co/600x800?text=Ornstein+%26+Smough',
  'Sister Friede': 'https://placehold.co/600x800?text=Sister+Friede',
  'Nameless King': 'https://placehold.co/600x800?text=Nameless+King',
  'Lady Maria': 'https://placehold.co/600x800?text=Lady+Maria',
  'Fume Knight': 'https://placehold.co/600x800?text=Fume+Knight'
};

const boticariaImages = {
  Maomao: 'https://placehold.co/600x800?text=Maomao',
  Jinshi: 'https://placehold.co/600x800?text=Jinshi',
  Gaoshun: 'https://placehold.co/600x800?text=Gaoshun',
  Gyokuyou: 'https://placehold.co/600x800?text=Gyokuyou',
  Lihua: 'https://placehold.co/600x800?text=Lihua',
  Lakan: 'https://placehold.co/600x800?text=Lakan'
};

async function applyImages(collection, mapping) {
  for (const [name, imageUrl] of Object.entries(mapping)) {
    await collection.updateMany(
      { name },
      { $set: { imageUrl } }
    );
  }
}

async function main() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const db = client.db(dbName);

    await applyImages(db.collection('bosses_dark_souls'), bossesImages);
    await applyImages(db.collection('personajes_boticaria'), boticariaImages);

    console.log('Imagenes actualizadas.');
  } catch (error) {
    console.error('Error al actualizar imagenes:', error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
