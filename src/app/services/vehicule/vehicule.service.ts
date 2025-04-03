import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private apiUrl = 'http://localhost:5001/api/vehicule'; // Remplace par l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Fonction pour créer un nouveau véhicule
  createVehicule(matricule: string, annees: string, model: string, energie: string, moteur: string, transmission: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { matricule, annees, model, energie, moteur, transmission };

    return this.http.post(`${this.apiUrl}/vehicules`, body, { headers });
  }

  getVehiculeByMatricule(matricule: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/vehicules/matricule/${matricule}`, { headers });
  }

  updateVehicule(matricule: string, vehiculeData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/vehicules/matricule/${matricule}`, vehiculeData, { headers });
  }
  

 
  
}
