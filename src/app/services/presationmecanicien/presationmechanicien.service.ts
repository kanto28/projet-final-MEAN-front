import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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


  // Récupérer les prestations mécanicien pour une prestation spécifique
  getPrestationsByPrestationId(prestationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prestations-mecanicien/prestation/${prestationId}`);
  }

  //récupérer les prestations d'un mécanicien spécifique
  getPrestationsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prestations-mecanicien/user/${userId}`);
  }
 // Récupère tous les utilisateurs avec le rôle mécanicien
// presationmechanicien.service.ts
getMecaniciens(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/mecaniciens`).pipe(
    catchError(error => {
      console.error('Erreur détaillée:', error);
      return throwError(() => new Error('Erreur lors de la récupération des mécaniciens'));
    })
  );
}
  
}
