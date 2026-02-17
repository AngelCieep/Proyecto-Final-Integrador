import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

type Boticaria = {
  _id?: string;
  name: string;
  role?: string;
  affiliation?: string;
  imageUrl?: string;
  traits?: string[];
  region?: string;
  description?: string;
};

const API_BASE = 'http://localhost:3000/api';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  boticaria = signal<Boticaria[]>([]);
  selectedBoticaria = signal<Boticaria | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Boticaria[]>(`${API_BASE}/boticaria`).subscribe({
      next: (boticaria) => {
        this.boticaria.set(boticaria);
        this.selectedBoticaria.set(boticaria[0] ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la API. Verifica el backend.');
        this.loading.set(false);
      }
    });
  }

  selectBoticaria(personaje: Boticaria): void {
    this.selectedBoticaria.set(personaje);
  }
}
