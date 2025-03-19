import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeVehiculeService {

   private apiUrl = 'http://localhost:5001/api/type-vehicule/typevehicules';
   
     constructor(private http: HttpClient) { }
   
     //créer une nouvelle vehicule
     createMoteur(name: string): Observable<any> {
       const token = localStorage.getItem('token'); 
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
       return this.http.post(this.apiUrl, { name }, { headers });
     }
     
   
     // Récupérer toutes les type de vehicules
    getTypeVehicules(): Observable<any> {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
      return this.http.get<any>(this.apiUrl, { headers });
    }
   
     // Mettre à jour une type de vehicules existante
   updateTypeVehicule(id: string, name: string): Observable<any> {
     const token = localStorage.getItem('token'); 
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
     const url = `${this.apiUrl}/${id}`; 
     return this.http.put(url, { name }, { headers });
   }
   
   // Supprimer une type de vehicules existante
   deleteTypeVehicule(id: string): Observable<any> {
     const token = localStorage.getItem('token'); 
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
     const url = `${this.apiUrl}/${id}`; 
     return this.http.delete(url, { headers });
   }
}
