import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergieService {

  private apiUrl = 'http://localhost:5001/api/energie/energies';

  constructor(private http: HttpClient) { }

  //créer une nouvelle énergie
  createEnergie(name: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.post(this.apiUrl, { name }, { headers });
  }
  

  // Récupérer toutes les énergies
  getEnergies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Mettre à jour une énergie existante
updateEnergie(id: string, name: string): Observable<any> {
  const token = localStorage.getItem('token'); 
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
  const url = `${this.apiUrl}/${id}`; 
  return this.http.put(url, { name }, { headers });
}

// Supprimer une énergie existante
deleteEnergie(id: string): Observable<any> {
  const token = localStorage.getItem('token'); 
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
  const url = `${this.apiUrl}/${id}`; 
  return this.http.delete(url, { headers });
}

}
