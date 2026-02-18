import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ProyectoAPI';

if (!uri) {
  console.error('MONGODB_URI no esta configurada en .env');
  process.exit(1);
}

function mapBossToPersonaje(boss) {
  return {
    tipo: 'darksouls',
    name: boss.name,
    title: boss.title,
    location: boss.location,
    game: boss.game,
    imageUrl: boss.imageUrl,
    weakness: boss.weakness,
    difficulty: boss.difficulty,
    description: boss.description
  };
}

function mapBoticariaToPersonaje(personaje) {
  return {
    tipo: 'boticaria',
    name: personaje.name,
    role: personaje.role,
    affiliation: personaje.affiliation,
    imageUrl: personaje.imageUrl,
    traits: personaje.traits,
    region: personaje.region,
    description: personaje.description
  };
}

async function main() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });

  try {
    await client.connect();
    const db = client.db(dbName);

    const bosses = await db.collection('bosses_dark_souls').find({}).toArray();
    const boticaria = await db.collection('personajes_boticaria').find({}).toArray();

    const personajes = [
      ...bosses.map(mapBossToPersonaje),
      ...boticaria.map(mapBoticariaToPersonaje)
    ];

    const personajesCollection = db.collection('personajes');
    await personajesCollection.deleteMany({});

    if (personajes.length > 0) {
      await personajesCollection.insertMany(personajes);
    }

    console.log(
      `Personajes actualizado. bosses: ${bosses.length}, boticaria: ${boticaria.length}, total: ${personajes.length}.`
    );
  } catch (error) {
    console.error('Error al combinar personajes:', error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
