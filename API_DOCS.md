# Documentación API - Proyecto Final Integrador

Base URL: `http://localhost:3000`

## Índice
- [Health Check](#health-check)
- [Bosses (Dark Souls)](#bosses-dark-souls)
- [Boticaria](#boticaria)
- [Personajes](#personajes)

---

## Health Check

### GET `/api/health`
Verifica el estado de la API.

**Respuesta exitosa (200):**
```json
{
  "status": "ok"
}
```

---

## Bosses (Dark Souls)

### GET `/api/bosses`
Obtiene todos los bosses de Dark Souls.

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ornstein and Smough",
    "location": "Anor Londo",
    "difficulty": "Hard",
    "createdAt": "2026-02-21T10:00:00.000Z"
  },
  ...
]
```

---

### GET `/api/bosses/:id`
Obtiene un boss específico por su ID.

**Parámetros:**
- `id` (string, requerido): ID del boss en formato ObjectId de MongoDB

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ornstein and Smough",
  "location": "Anor Londo",
  "difficulty": "Hard",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

**Errores:**
- `400`: ID inválido
  ```json
  { "error": "id invalido" }
  ```
- `404`: Boss no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

### POST `/api/bosses`
Crea un nuevo boss.

**Body (JSON):**
```json
{
  "name": "Artorias the Abysswalker",
  "location": "Darkroot Basin",
  "difficulty": "Hard"
}
```

**Campos:**
- `name` (string, requerido): Nombre del boss

**Respuesta exitosa (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Artorias the Abysswalker",
  "location": "Darkroot Basin",
  "difficulty": "Hard",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

**Errores:**
- `400`: Campo name faltante
  ```json
  { "error": "name es requerido" }
  ```

---

### PUT `/api/bosses/:id`
Actualiza un boss existente.

**Parámetros:**
- `id` (string, requerido): ID del boss en formato ObjectId de MongoDB

**Body (JSON):**
```json
{
  "name": "Artorias the Abysswalker",
  "location": "Darkroot Basin",
  "difficulty": "Very Hard"
}
```

**Campos:**
- `name` (string, requerido): Nombre del boss

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Artorias the Abysswalker",
  "location": "Darkroot Basin",
  "difficulty": "Very Hard",
  "createdAt": "2026-02-21T10:00:00.000Z",
  "updatedAt": "2026-02-21T11:00:00.000Z"
}
```

**Errores:**
- `400`: ID inválido o campo name faltante
  ```json
  { "error": "id invalido" }
  ```
  ```json
  { "error": "name es requerido" }
  ```
- `404`: Boss no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

### DELETE `/api/bosses/:id`
Elimina un boss.

**Parámetros:**
- `id` (string, requerido): ID del boss en formato ObjectId de MongoDB

**Respuesta exitosa (200):**
```json
{
  "status": "deleted"
}
```

**Errores:**
- `400`: ID inválido
  ```json
  { "error": "id invalido" }
  ```
- `404`: Boss no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

## Boticaria

### GET `/api/boticaria`
Obtiene todos los personajes de la boticaria.

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Hawkins",
    "role": "Curandero",
    "createdAt": "2026-02-21T10:00:00.000Z"
  },
  ...
]
```

---

### GET `/api/boticaria/:id`
Obtiene un personaje específico de la boticaria por su ID.

**Parámetros:**
- `id` (string, requerido): ID del personaje en formato ObjectId de MongoDB

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Hawkins",
  "role": "Curandero",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

**Errores:**
- `400`: ID inválido
  ```json
  { "error": "id invalido" }
  ```
- `404`: Personaje no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

### POST `/api/boticaria`
Crea un nuevo personaje de la boticaria.

**Body (JSON):**
```json
{
  "name": "Mafalda",
  "role": "Aprendiz"
}
```

**Campos:**
- `name` (string, requerido): Nombre del personaje

**Respuesta exitosa (201):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Mafalda",
  "role": "Aprendiz",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

**Errores:**
- `400`: Campo name faltante
  ```json
  { "error": "name es requerido" }
  ```

---

### PUT `/api/boticaria/:id`
Actualiza un personaje de la boticaria existente.

**Parámetros:**
- `id` (string, requerido): ID del personaje en formato ObjectId de MongoDB

**Body (JSON):**
```json
{
  "name": "Mafalda",
  "role": "Boticaria"
}
```

**Campos:**
- `name` (string, requerido): Nombre del personaje

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Mafalda",
  "role": "Boticaria",
  "createdAt": "2026-02-21T10:00:00.000Z",
  "updatedAt": "2026-02-21T11:00:00.000Z"
}
```

**Errores:**
- `400`: ID inválido o campo name faltante
  ```json
  { "error": "id invalido" }
  ```
  ```json
  { "error": "name es requerido" }
  ```
- `404`: Personaje no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

### DELETE `/api/boticaria/:id`
Elimina un personaje de la boticaria.

**Parámetros:**
- `id` (string, requerido): ID del personaje en formato ObjectId de MongoDB

**Respuesta exitosa (200):**
```json
{
  "status": "deleted"
}
```

**Errores:**
- `400`: ID inválido
  ```json
  { "error": "id invalido" }
  ```
- `404`: Personaje no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

## Personajes

### GET `/api/personajes`
Obtiene todos los personajes.

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Personaje 1",
    "description": "Descripción del personaje",
    "createdAt": "2026-02-21T10:00:00.000Z"
  },
  ...
]
```

---

### GET `/api/personajes/:id`
Obtiene un personaje específico por su ID.

**Parámetros:**
- `id` (string, requerido): ID del personaje en formato ObjectId de MongoDB

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "name": "Personaje 1",
  "description": "Descripción del personaje",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

**Errores:**
- `400`: ID inválido
  ```json
  { "error": "id invalido" }
  ```
- `404`: Personaje no encontrado
  ```json
  { "error": "no encontrado" }
  ```

---

### POST `/api/personajes`
Crea un nuevo personaje.

**Body (JSON):**
```json
{
  "name": "Nuevo Personaje",
  "description": "Descripción del personaje"
}
```

**Campos:**
- `name` (string, requerido): Nombre del personaje

**Respuesta exitosa (201):**
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "name": "Nuevo Personaje",
  "description": "Descripción del personaje",
  "createdAt": "2026-02-21T10:00:00.000Z"
}
```

**Errores:**
- `400`: Campo name faltante
  ```json
  { "error": "name es requerido" }
  ```

---

## Errores Generales

### Error 500 - Error Interno
```json
{
  "error": "error interno"
}
```

---

## Notas

- Todos los endpoints retornan JSON
- Los IDs deben ser ObjectId válidos de MongoDB (24 caracteres hexadecimales)
- Los campos `createdAt` y `updatedAt` son generados automáticamente por la API
- El campo `name` es requerido en todas las operaciones POST y PUT
- CORS está habilitado para todas las peticiones
