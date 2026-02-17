import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ProyectoAPI';

if (!uri) {
  console.error('MONGODB_URI no esta configurada en .env');
  process.exit(1);
}

const bosses = [
  {
    name: 'Artorias the Abysswalker',
    title: 'Knight of Gwyn',
    location: 'Royal Wood',
    game: 'Dark Souls',
    imageUrl: 'https://placehold.co/600x800?text=Artorias',
    weakness: 'strike damage',
    difficulty: 'high',
    description: 'Legendary knight consumed by the Abyss.'
  },
  {
    name: 'Ornstein and Smough',
    title: 'Executioner and Dragonslayer',
    location: 'Anor Londo',
    game: 'Dark Souls',
    imageUrl: 'https://placehold.co/600x800?text=Ornstein+%26+Smough',
    weakness: 'lightning or fire',
    difficulty: 'very high',
    description: 'Dual boss battle with alternating phases.'
  },
  {
    name: 'Sister Friede',
    title: 'Lady of Ariandel',
    location: 'Painting of Ariandel',
    game: 'Dark Souls III',
    imageUrl: 'https://placehold.co/600x800?text=Sister+Friede',
    weakness: 'poise break',
    difficulty: 'very high',
    description: 'Three-phase duel with fast aggression.'
  },
  {
    name: 'Nameless King',
    title: 'Heir of Lightning',
    location: 'Archdragon Peak',
    game: 'Dark Souls III',
    imageUrl: 'https://placehold.co/600x800?text=Nameless+King',
    weakness: 'dark damage',
    difficulty: 'very high',
    description: 'Storm drake rider with delayed attacks.'
  },
  {
    name: 'Lady Maria',
    title: 'Astral Clocktower Hunter',
    location: 'Research Hall',
    game: 'Bloodborne',
    imageUrl: 'https://placehold.co/600x800?text=Lady+Maria',
    weakness: 'parry',
    difficulty: 'high',
    description: 'Elegant duel with blood and fire phases.'
  },
  {
    name: 'Fume Knight',
    title: 'Raime',
    location: 'Brume Tower',
    game: 'Dark Souls II',
    imageUrl: 'https://placehold.co/600x800?text=Fume+Knight',
    weakness: 'lightning',
    difficulty: 'high',
    description: 'Relentless sword master with a cursed blade.'
  }
];

const boticaria = [
  {
    name: 'Maomao',
    role: 'Apothecary',
    affiliation: 'Inner Palace',
    imageUrl: 'https://placehold.co/600x800?text=Maomao',
    traits: ['curious', 'analytical'],
    region: 'Capital',
    description: 'A sharp-minded girl who solves palace mysteries.'
  },
  {
    name: 'Jinshi',
    role: 'High official',
    affiliation: 'Imperial Court',
    imageUrl: 'https://placehold.co/600x800?text=Jinshi',
    traits: ['charismatic', 'secretive'],
    region: 'Capital',
    description: 'Influential noble with a hidden identity.'
  },
  {
    name: 'Gaoshun',
    role: 'Attendant',
    affiliation: 'Imperial Court',
    imageUrl: 'https://placehold.co/600x800?text=Gaoshun',
    traits: ['loyal', 'diligent'],
    region: 'Capital',
    description: 'Trusted aide who manages court affairs.'
  },
  {
    name: 'Gyokuyou',
    role: 'Consort',
    affiliation: 'Inner Palace',
    imageUrl: 'https://placehold.co/600x800?text=Gyokuyou',
    traits: ['graceful', 'kind'],
    region: 'Capital',
    description: 'Beloved consort respected by the court.'
  },
  {
    name: 'Lihua',
    role: 'Consort',
    affiliation: 'Inner Palace',
    imageUrl: 'https://placehold.co/600x800?text=Lihua',
    traits: ['proud', 'ambitious'],
    region: 'Capital',
    description: 'Consort who seeks influence in the palace.'
  },
  {
    name: 'Lakan',
    role: 'Military officer',
    affiliation: 'Outer Court',
    imageUrl: 'https://placehold.co/600x800?text=Lakan',
    traits: ['strategic', 'direct'],
    region: 'Frontier',
    description: 'Officer known for sharp strategy and discipline.'
  }
];

async function seedCollection(db, name, items) {
  const collection = db.collection(name);
  const count = await collection.countDocuments();
  if (count > 0) {
    console.log(`${name}: ya tiene datos, se omite.`);
    return;
  }

  await collection.insertMany(items);
  console.log(`${name}: datos insertados (${items.length}).`);
}

async function main() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    await client.connect();
    const db = client.db(dbName);

    await seedCollection(db, 'bosses_dark_souls', bosses);
    await seedCollection(db, 'personajes_boticaria', boticaria);
  } catch (error) {
    console.error('Error al sembrar datos:', error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
