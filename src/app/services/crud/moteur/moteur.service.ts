import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoteurService {

  private apiUrl = 'http://localhost:5001/api/moteur/moteurs';
 
   constructor(private http: HttpClient) { }
 
   //créer une nouvelle moteurs
   createMoteur(name: string): Observable<any> {
     const token = localStorage.getItem('token'); 
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
     return this.http.post(this.apiUrl, { name }, { headers });
   }
   
 
   // Récupérer toutes les moteurss
   getMoteurs(): Observable<any> {
     return this.http.get<any>(this.apiUrl);
   }
 
   // Mettre à jour une moteurs existante
 updateMoteur(id: string, name: string): Observable<any> {
   const token = localStorage.getItem('token'); 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
   const url = `${this.apiUrl}/${id}`; 
   return this.http.put(url, { name }, { headers });
 }
 
 // Supprimer une moteurs existante
 deleteMoteur(id: string): Observable<any> {
   const token = localStorage.getItem('token'); 
   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
   const url = `${this.apiUrl}/${id}`; 
   return this.http.delete(url, { headers });
 }
}
