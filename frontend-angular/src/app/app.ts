import { Component, OnInit, signal, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

type Personaje = {
  _id?: string;
  tipo: 'darksouls' | 'boticaria';
  name: string;
  role?: string;
  affiliation?: string;
  imageUrl?: string;
  traits?: string[];
  region?: string;
  description?: string;
  title?: string;
  location?: string;
  game?: string;
  weakness?: string;
  difficulty?: string;
};

type Filtro = 'todos' | 'darksouls' | 'boticaria';

const API_BASE = 'http://localhost:3000/api';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  personajes = signal<Personaje[]>([]);
  selectedPersonaje = signal<Personaje | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  showForm = signal<boolean>(false);
  saving = signal<boolean>(false);
  
  searchTerm = signal<string>('');
  filtroActivo = signal<Filtro>('todos');

  newPersonaje: Personaje = {
    tipo: 'boticaria',
    name: '',
    role: '',
    affiliation: '',
    imageUrl: '',
    traits: [],
    region: '',
    description: '',
    title: '',
    location: '',
    game: '',
    weakness: '',
    difficulty: ''
  };

  traitsInput: string = '';

  // Computed: personajes filtrados por tipo y búsqueda
  personajesFiltrados = computed(() => {
    let result = this.personajes();
    
    // Filtrar por tipo
    const filtro = this.filtroActivo();
    if (filtro !== 'todos') {
      result = result.filter(p => p.tipo === filtro);
    }
    
    // Filtrar por búsqueda
    const search = this.searchTerm().toLowerCase().trim();
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) ||
        (p.role && p.role.toLowerCase().includes(search)) ||
        (p.title && p.title.toLowerCase().includes(search))
      );
    }
    
    return result;
  });

  // Contadores por tipo
  totalPersonajes = computed(() => this.personajes().length);
  totalDarkSouls = computed(() => this.personajes().filter(p => p.tipo === 'darksouls').length);
  totalBoticaria = computed(() => this.personajes().filter(p => p.tipo === 'boticaria').length);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Personaje[]>(`${API_BASE}/personajes`).subscribe({
      next: (personajes) => {
        this.personajes.set(personajes);
        this.selectedPersonaje.set(personajes[0] ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la API. Verifica el backend.');
        this.loading.set(false);
      }
    });
  }

  selectPersonaje(personaje: Personaje): void {
    this.selectedPersonaje.set(personaje);
  }

  setFiltro(filtro: Filtro): void {
    this.filtroActivo.set(filtro);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  openForm(): void {
    this.showForm.set(true);
    this.resetForm();
  }

  closeForm(): void {
    this.showForm.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.newPersonaje = {
      tipo: 'boticaria',
      name: '',
      role: '',
      affiliation: '',
      imageUrl: '',
      traits: [],
      region: '',
      description: '',
      title: '',
      location: '',
      game: '',
      weakness: '',
      difficulty: ''
    };
    this.traitsInput = '';
  }

  // Devuelve true si el personaje es tipo Dark Souls
  isDarkSoulsForm(): boolean {
    return this.newPersonaje.tipo === 'darksouls';
  }

  createPersonaje(): void {
    if (!this.newPersonaje.name.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    // Convertir traitsInput en array
    if (this.traitsInput.trim()) {
      this.newPersonaje.traits = this.traitsInput.split(',').map(t => t.trim()).filter(t => t);
    }

    // Limpiar campos no usados según el tipo
    const payload = { ...this.newPersonaje };
    if (payload.tipo === 'boticaria') {
      // Boticaria no usa estos campos
      delete payload.title;
      delete payload.location;
      delete payload.game;
      delete payload.weakness;
      delete payload.difficulty;
    } else {
      // Dark Souls no usa estos campos
      delete payload.role;
      delete payload.affiliation;
      delete payload.region;
      delete payload.traits;
    }

    this.saving.set(true);

    this.http.post<Personaje>(`${API_BASE}/personajes`, payload).subscribe({
      next: (personaje) => {
        this.personajes.update(list => [...list, personaje]);
        this.selectedPersonaje.set(personaje);
        this.saving.set(false);
        this.closeForm();
      },
      error: (err) => {
        console.error('Error al crear personaje:', err);
        alert('No se pudo crear el personaje. Verifica el backend.');
        this.saving.set(false);
      }
    });
  }
}
