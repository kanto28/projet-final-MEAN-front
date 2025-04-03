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

  // Récupérer les véhicules pour un utilisateur
  getVehiculesByUserId(userId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Assure-toi de stocker le token dans le stockage local après la connexion
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/vehicules/user/${userId}`, { headers });
  }

  // Créer un véhicule
  createVehicule(vehiculeData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assure-toi de stocker le token dans le stockage local après la connexion
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/vehicules`, vehiculeData, { headers });
  }

  // Nouvelle méthode pour récupérer les véhicules d'un utilisateur
  // getVehiculesByUser(userId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/vehicules/user/${userId}`);
  // }

  getVehiculesByUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicules/user/${userId}?populate=model,energie,moteur,transmission`);
  }
}
