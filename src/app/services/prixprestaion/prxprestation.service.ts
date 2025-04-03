import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrxprestationService {

  private apiUrl = 'http://localhost:5001/api/prix-prestation';

  constructor(private http: HttpClient) {}

   // Fonction pour créer un nouveau véhicule
  //  createPrestation(prestationData: any) {
  //   return this.http.post(`${this.apiUrl}/prestations`, prestationData);
  // }

  // Fonction pour créer une prestation avec des headers
  createPrestation(prestationData: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token d\'authentification manquant');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/prestation`, prestationData, { headers });
  }

  getAllPrestations(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token d\'authentification manquant');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/prestation`);
  }

  getPrestationsWithLastPrice(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token d\'authentification manquant');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/prestation/dernier-prix`);
  }

  

}
