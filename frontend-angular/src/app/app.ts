import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
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

const API_BASE = 'http://localhost:3000/api';
const PERSONAJE_TIPO = 'boticaria';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  boticaria = signal<Personaje[]>([]);
  selectedBoticaria = signal<Personaje | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Personaje[]>(`${API_BASE}/personajes`).subscribe({
      next: (personajes) => {
        const filtered = personajes.filter((item) => item.tipo === PERSONAJE_TIPO);
        this.boticaria.set(filtered);
        this.selectedBoticaria.set(filtered[0] ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la API. Verifica el backend.');
        this.loading.set(false);
      }
    });
  }

  selectBoticaria(personaje: Personaje): void {
    this.selectedBoticaria.set(personaje);
  }
}
