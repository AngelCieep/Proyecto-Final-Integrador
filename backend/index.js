import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'ProyectoAPI';

if (!MONGODB_URI) {
  console.error('MONGODB_URI no esta configurada en .env');
  process.exit(1);
}

const COLLECTIONS = {
  bosses: 'bosses_dark_souls',
  boticaria: 'personajes_boticaria',
  personajes: 'personajes',
};

const client = new MongoClient(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
});

let db;

app.use(cors());
app.use(express.json());

function getCollection(key) {
  return db.collection(COLLECTIONS[key]);
}

function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/bosses', async (req, res, next) => {
  try {
    const items = await getCollection('bosses').find({}).toArray();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

app.get('/api/bosses/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    const item = await getCollection('bosses').findOne({ _id: objectId });
    if (!item) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

app.post('/api/bosses', async (req, res, next) => {
  try {
    if (!req.body?.name) {
      return res.status(400).json({ error: 'name es requerido' });
    }

    const payload = { ...req.body, createdAt: new Date() };
    const result = await getCollection('bosses').insertOne(payload);
    const created = await getCollection('bosses').findOne({ _id: result.insertedId });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

app.put('/api/bosses/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    if (!req.body?.name) {
      return res.status(400).json({ error: 'name es requerido' });
    }

    const update = { ...req.body, updatedAt: new Date() };
    const result = await getCollection('bosses').updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    const item = await getCollection('bosses').findOne({ _id: objectId });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/bosses/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    const result = await getCollection('bosses').deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    res.json({ status: 'deleted' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/boticaria', async (req, res, next) => {
  try {
    const items = await getCollection('boticaria').find({}).toArray();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

app.get('/api/personajes', async (req, res, next) => {
  try {
    const items = await getCollection('personajes').find({}).toArray();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

app.get('/api/personajes/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    const item = await getCollection('personajes').findOne({ _id: objectId });
    if (!item) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

app.post('/api/personajes', async (req, res, next) => {
  try {
    if (!req.body?.name) {
      return res.status(400).json({ error: 'name es requerido' });
    }

    const payload = { ...req.body, createdAt: new Date() };
    const result = await getCollection('personajes').insertOne(payload);
    const created = await getCollection('personajes').findOne({ _id: result.insertedId });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

app.get('/api/boticaria/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    const item = await getCollection('boticaria').findOne({ _id: objectId });
    if (!item) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

app.post('/api/boticaria', async (req, res, next) => {
  try {
    if (!req.body?.name) {
      return res.status(400).json({ error: 'name es requerido' });
    }

    const payload = { ...req.body, createdAt: new Date() };
    const result = await getCollection('boticaria').insertOne(payload);
    const created = await getCollection('boticaria').findOne({ _id: result.insertedId });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

app.put('/api/boticaria/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    if (!req.body?.name) {
      return res.status(400).json({ error: 'name es requerido' });
    }

    const update = { ...req.body, updatedAt: new Date() };
    const result = await getCollection('boticaria').updateOne(
      { _id: objectId },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    const item = await getCollection('boticaria').findOne({ _id: objectId });
    res.json(item);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/boticaria/:id', async (req, res, next) => {
  try {
    const objectId = parseObjectId(req.params.id);
    if (!objectId) {
      return res.status(400).json({ error: 'id invalido' });
    }

    const result = await getCollection('boticaria').deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'no encontrado' });
    }

    res.json({ status: 'deleted' });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'error interno' });
});

async function start() {
  await client.connect();
  db = client.db(DB_NAME);

  app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('No se pudo iniciar la API:', error.message);
  process.exit(1);
});
