import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environnements/environnement';
import { Energie } from '../../../models/energie.model';

@Injectable({
  providedIn: 'root'
})
export class EnergieService {

  private apiUrl = `${environment.apiBaseUrl}/energie/energies`;

  constructor(private http: HttpClient) { }
  

  // --- Méthodes CRUD simplifiées ---

  createEnergie(name: string): Observable<Energie> {
    return this.http.post<Energie>(this.apiUrl, { name });
  }

  getEnergies(): Observable<Energie[]> {
    return this.http.get<Energie[]>(this.apiUrl);
  }

  updateEnergie(id: string, name: string): Observable<Energie> {
    return this.http.put<Energie>(`${this.apiUrl}/${id}`, { name });
  }

  deleteEnergie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  

//   //créer une nouvelle énergie
//   createEnergie(name: string): Observable<any> {
//     const token = localStorage.getItem('token'); 
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
//     return this.http.post(this.apiUrl, { name }, { headers });
//   }
  

//   // Récupérer toutes les énergies
//   getEnergies(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   // Mettre à jour une énergie existante
// updateEnergie(id: string, name: string): Observable<any> {
//   const token = localStorage.getItem('token'); 
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
//   const url = `${this.apiUrl}/${id}`; 
//   return this.http.put(url, { name }, { headers });
// }

// // Supprimer une énergie existante
// deleteEnergie(id: string): Observable<any> {
//   const token = localStorage.getItem('token'); 
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
//   const url = `${this.apiUrl}/${id}`; 
//   return this.http.delete(url, { headers });
// }

}
