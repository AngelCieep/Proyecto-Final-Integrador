import { useEffect, useState } from 'react'
import './App.css'

type Boss = {
  _id?: string
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

function App() {
  const [bosses, setBosses] = useState<Boss[]>([])
  const [selectedBoss, setSelectedBoss] = useState<Boss | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const bossRes = await fetch(`${API_BASE}/bosses`)

        if (!bossRes.ok) {
          throw new Error('No se pudo cargar la API')
        }

        const bossData = (await bossRes.json()) as Boss[]

        setBosses(bossData)
        setSelectedBoss(bossData[0] ?? null)
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
            <strong>Bosses</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{bosses.length}</strong>
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
              {bosses.map((boss) => (
                <li key={boss._id ?? boss.name}>
                  <button
                    className={`item ${selectedBoss?._id === boss._id ? 'active' : ''}`}
                    onClick={() => setSelectedBoss(boss)}
                  >
                    <img
                      className="avatar"
                      src={boss.imageUrl ?? 'https://placehold.co/96x128?text=Foto'}
                      alt={boss.name}
                    />
                    <div>
                      <span className="item-title">{boss.name}</span>
                      <span className="item-meta">{boss.game}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {selectedBoss && (
              <div className="panel-detail">
                <div className="detail-header">
                  <img
                    className="portrait"
                    src={selectedBoss.imageUrl ?? 'https://placehold.co/240x320?text=Foto'}
                    alt={selectedBoss.name}
                  />
                  <div>
                    <h3>{selectedBoss.name}</h3>
                    <p className="detail-title">{selectedBoss.title}</p>
                  </div>
                </div>
                <div className="detail-grid">
                  <div>
                    <span className="label">Lugar</span>
                    <span>{selectedBoss.location ?? 'N/A'}</span>
                  </div>
                  <div>
                    <span className="label">Debilidad</span>
                    <span>{selectedBoss.weakness ?? 'N/A'}</span>
                  </div>
                  <div>
                    <span className="label">Dificultad</span>
                    <span>{selectedBoss.difficulty ?? 'N/A'}</span>
                  </div>
                </div>
                <p className="detail-desc">{selectedBoss.description ?? 'Sin descripcion.'}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
