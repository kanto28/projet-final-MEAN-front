import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

 private apiUrl = 'http://localhost:5001/api/marque/marques';
      
        constructor(private http: HttpClient) { }
      
        //créer une nouvelle marque
        createMarque(name: string): Observable<any> {
          const token = localStorage.getItem('token'); 
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
          return this.http.post(this.apiUrl, { name }, { headers });
        }
        
      
        // Récupérer toutes les marque
       getMarques(): Observable<any> {
         const token = localStorage.getItem('token'); 
         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
         return this.http.get<any>(this.apiUrl, { headers });
       }
      
        // Mettre à jour une marque existante
      updateMarque(id: string, name: string): Observable<any> {
        const token = localStorage.getItem('token'); 
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
        const url = `${this.apiUrl}/${id}`; 
        return this.http.put(url, { name }, { headers });
      }
      
      // Supprimer une marque existante
      deleteMarque(id: string): Observable<any> {
        const token = localStorage.getItem('token'); 
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
        const url = `${this.apiUrl}/${id}`; 
        return this.http.delete(url, { headers });
      }
}
