import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeuserService {

  private apiUrl = 'http://localhost:5001/api/vehicule-user'; // L'URL de ton backend

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer les données de création de véhicule
  createVehicule(vehiculeData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assure-toi de stocker le token dans le stockage local après la connexion
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, vehiculeData, { headers });
  }
}
