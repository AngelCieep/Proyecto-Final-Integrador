import { useEffect, useState } from 'react'
import './App.css'

type Personaje = {
  _id?: string
  tipo: 'darksouls' | 'boticaria'
  name: string
  title?: string
  location?: string
  game?: string
  imageUrl?: string
  weakness?: string
  difficulty?: string
  description?: string
}

const API_BASE = 'http://localhost:3000/api'
const PERSONAJE_TIPO = 'darksouls'

function App() {
  const [personajes, setPersonajes] = useState<Personaje[]>([])
  const [selectedPersonaje, setSelectedPersonaje] = useState<Personaje | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const personajeRes = await fetch(`${API_BASE}/personajes`)

        if (!personajeRes.ok) {
          throw new Error('No se pudo cargar la API')
        }

        const personajeData = (await personajeRes.json()) as Personaje[]
        const filtered = personajeData.filter((item) => item.tipo === PERSONAJE_TIPO)

        setPersonajes(filtered)
        setSelectedPersonaje(filtered[0] ?? null)
      } catch (err) {
        setError('No se pudo cargar la API. Verifica el backend.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="tag">Archivo vivo</p>
          <h1>Bosses de Dark Souls</h1>
          <p className="lead">Listado completo de jefes legendarios y sus detalles clave.</p>
          {loading && <p className="status">Cargando datos...</p>}
          {error && <p className="status error">{error}</p>}
        </div>
        <div className="hero-metrics">
          <div>
            <span>Coleccion</span>
            <strong>Personajes</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{personajes.length}</strong>
          </div>
        </div>
      </header>

      <main className="panels">
        <section className="panel">
          <div className="panel-header">
            <h2>Bosses de Dark Souls</h2>
            <p>Selecciona un boss para ver el detalle.</p>
          </div>
          <div className="panel-body">
            <ul className="panel-list">
              {personajes.map((personaje) => (
                <li key={personaje._id ?? personaje.name}>
                  <button
                    className={`item ${selectedPersonaje?._id === personaje._id ? 'active' : ''}`}
                    onClick={() => setSelectedPersonaje(personaje)}
                  >
                    <img
                      className="avatar"
                      src={personaje.imageUrl ?? 'https://placehold.co/96x128?text=Foto'}
                      alt={personaje.name}
                    />
                    <div>
                      <span className="item-title">{personaje.name}</span>
                      <span className="item-meta">{personaje.game}</span>
                      <span className={`item-badge ${personaje.tipo}`}>
                        {personaje.tipo === 'darksouls' ? 'Dark Souls' : 'Boticaria'}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {selectedPersonaje && (
              <div className="panel-detail">
                <div className="detail-header">
                  <img
                    className="portrait"
                    src={selectedPersonaje.imageUrl ?? 'https://placehold.co/240x320?text=Foto'}
                    alt={selectedPersonaje.name}
                  />
                  <div>
                    <h3>{selectedPersonaje.name}</h3>
                    <p className="detail-title">{selectedPersonaje.title}</p>
                    <span className={`detail-badge ${selectedPersonaje.tipo}`}>
                      {selectedPersonaje.tipo === 'darksouls' ? 'Dark Souls' : 'Boticaria'}
                    </span>
                  </div>
                </div>
                <div className="detail-grid">
                  <div>
                    <span className="label">Lugar</span>
                    <span>{selectedPersonaje.location ?? 'N/A'}</span>
                  </div>
                  <div>
                    <span className="label">Debilidad</span>
                    <span>{selectedPersonaje.weakness ?? 'N/A'}</span>
                  </div>
                  <div>
                    <span className="label">Dificultad</span>
                    <span>{selectedPersonaje.difficulty ?? 'N/A'}</span>
                  </div>
                </div>
                <p className="detail-desc">
                  {selectedPersonaje.description ?? 'Sin descripcion.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
