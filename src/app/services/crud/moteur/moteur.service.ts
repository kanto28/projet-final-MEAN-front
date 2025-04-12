import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environnements/environnement';
import { Moteur } from '../../../models/moteur.model';

@Injectable({
  providedIn: 'root'
})
export class MoteurService {

   private apiUrl = `${environment.apiBaseUrl}/moteur/moteurs`;
 
   constructor(private http: HttpClient) { }
 
   // --- Méthodes CRUD simplifiées ---

  createMoteur(name: string): Observable<Moteur> {
    return this.http.post<Moteur>(this.apiUrl, { name });
  }

  getMoteurs(): Observable<Moteur[]> {
    return this.http.get<Moteur[]>(this.apiUrl);
  }

  updateMoteur(id: string, name: string): Observable<Moteur> {
    return this.http.put<Moteur>(`${this.apiUrl}/${id}`, { name });
  }

  deleteMoteur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
