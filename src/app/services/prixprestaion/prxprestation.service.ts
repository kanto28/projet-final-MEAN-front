import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrxprestationService {

  private apiUrl = 'http://localhost:5001/api/prix-prestation';

  constructor(private http: HttpClient, private authService: AuthService) {}


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

  
  getDernierPrix(prestationId: string): Observable<any> {
    const user = this.authService.getCurrentUser();
    
    if (user?.role !== 'Manager') { // Adaptez selon vos rôles
      console.error('Accès refusé : Rôle insuffisant');
      return throwError(() => new Error('Accès non autorisé'));
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.get(`${this.apiUrl}/prestation/dernier-prix`, {
      params: { prestation: prestationId },
      headers: headers
    });
  }

}
