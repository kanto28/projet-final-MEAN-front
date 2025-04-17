import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Prestation } from '../../../models/prestation.model';
import { AuthService } from '../../auth.service';
import { environment } from '../../../../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  private apiUrl = `${environment.apiBaseUrl}/prestation/prestations`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Créer une prestation
  createPrestation(data: { name: string; duree: number; typeVehicule: string }): Observable<Prestation> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post<Prestation>(this.apiUrl, { ...data, user: user._id });
  }

  // Créer une prestation avec prix (Manager uniquement)
  createPrestationWithPrice(data: { name: string; duree: number; typeVehicule: string; prix: number }): Observable<Prestation> {
    const url = `${this.apiUrl}-prix`;
    return this.http.post<Prestation>(url, data);
  }

  // Mettre à jour une prestation
  updatePrestation(id: string, data: { name: string; duree: number; typeVehicule: string }): Observable<Prestation> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put<Prestation>(`${this.apiUrl}/${id}`, { ...data, user: user._id });
  }

  // Supprimer une prestation
  deletePrestation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer toutes les prestations
  getAllPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(this.apiUrl);
  }

  // Récupérer les prestations (doublon possible avec getAllPrestations, à fusionner si même logique)
  getPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(this.apiUrl);
  }

  // Récupérer les prestations par type de véhicule
  getPrestationsByVehicleType(typeVehiculeId: string): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.apiUrl}/type/${typeVehiculeId}`);
  }
}
