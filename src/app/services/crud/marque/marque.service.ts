import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environnements/environnement';
import { Marque } from '../../../models/marque.model';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  private apiUrl = `${environment.apiBaseUrl}/marque/marques`;
      
    constructor(private http: HttpClient) { }

      // --- Méthodes CRUD simplifiées ---
    createMarque(name: string): Observable<Marque> {
      return this.http.post<Marque>(this.apiUrl, { name });
    }

    getMarques(): Observable<Marque[]> {
      return this.http.get<Marque[]>(this.apiUrl);
    }

    updateMarque(id: string, name: string): Observable<Marque> {
      return this.http.put<Marque>(`${this.apiUrl}/${id}`, { name });
    }

    deleteMarque(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

     
}