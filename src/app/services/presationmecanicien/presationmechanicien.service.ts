import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresationmechanicienService {

  private apiUrl = 'http://localhost:5001/api/prestation-mecanicien';  // Remplace par l'URL de ton API

  constructor(private http: HttpClient) { }

  // Créer une prestation mécanicien
  createPrestationMecanicien(prestation: string, user: string): Observable<any> {
    const body = { prestation, user };
    return this.http.post(`${this.apiUrl}/prestations-mecanicien`, body);
  }

  // Fonction pour récupérer les prestations d'un mécanicien pour une prestation spécifique
  getPrestationsByPrestationId(prestationId: string): Observable<any> {
    const url = `${this.apiUrl}/prestation/${prestationId}`;  // Construire l'URL
    return this.http.get(url);  // Effectuer la requête GET
  }
}
