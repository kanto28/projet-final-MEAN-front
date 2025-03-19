import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  private apiUrl = 'http://localhost:5001/api/transmission/transmissions';
     
       constructor(private http: HttpClient) { }
     
       //créer une nouvelle transmission
       createTransmission(name: string): Observable<any> {
         const token = localStorage.getItem('token'); 
         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
         return this.http.post(this.apiUrl, { name }, { headers });
       }
       
     
       // Récupérer toutes les transmission
      getTransmissions(): Observable<any> {
        const token = localStorage.getItem('token'); 
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
        return this.http.get<any>(this.apiUrl, { headers });
      }
     
       // Mettre à jour une transmission existante
     updateTransmission(id: string, name: string): Observable<any> {
       const token = localStorage.getItem('token'); 
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
       const url = `${this.apiUrl}/${id}`; 
       return this.http.put(url, { name }, { headers });
     }
     
     // Supprimer une transmission existante
     deleteTransmission(id: string): Observable<any> {
       const token = localStorage.getItem('token'); 
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
       const url = `${this.apiUrl}/${id}`; 
       return this.http.delete(url, { headers });
     }
}
