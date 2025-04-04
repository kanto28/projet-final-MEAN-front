import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationrdvService {
  private apiUrl = 'http://localhost:5001/api/validation'; // Adaptez à votre URL backend

  constructor(private http: HttpClient) {}

  // validerRendezVous(validationData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/validation-rendez-et-planning`, validationData);
  // }

  // validerRendezVous(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/validation-rendez-et-planning`, data);
  // }

  validerRendezVous(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validation-rendez-et-planning`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Méthode pour récupérer la liste des rendez-vous
  getRendezvousList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list-rendezvous`); // Appel à la route /list-rendezvous
  }
}
