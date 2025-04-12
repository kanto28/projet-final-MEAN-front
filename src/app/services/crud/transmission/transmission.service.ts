import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environnements/environnement';
import { Transmission } from '../../../models/transmission.model';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  private apiUrl = `${environment.apiBaseUrl}/transmission/transmissions`;

  constructor(private http: HttpClient) { }

  // Créer une nouvelle transmission
  createTransmission(name: string): Observable<Transmission> {
    return this.http.post<Transmission>(this.apiUrl, { name });
  }

  // Récupérer toutes les transmissions
  getTransmissions(): Observable<Transmission[]> {
    return this.http.get<Transmission[]>(this.apiUrl);
  }

  // Mettre à jour une transmission existante
  updateTransmission(id: string, name: string): Observable<Transmission> {
    return this.http.put<Transmission>(`${this.apiUrl}/${id}`, { name });
  }

  // Supprimer une transmission existante
  deleteTransmission(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
