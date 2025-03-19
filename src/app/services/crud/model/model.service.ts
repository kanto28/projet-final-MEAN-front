import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  

  private apiUrl = 'http://localhost:5001/api/model/models';

  constructor(private http: HttpClient) { }

  // Créer un modèle
  createModel(name: string, marque: string, typeVehicule: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.post(this.apiUrl, { name, marque, typeVehicule }, { headers });
  }

  // Récupérer tous les modèles
  getModels(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Mettre à jour un modèle
  // updateModel(id: string, name: string, marque: string, typeVehicule: string): Observable<any> {
  //   const token = localStorage.getItem('token'); 
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
  //   const url = `${this.apiUrl}/${id}`; 
  //   return this.http.put(url, { name, marque, typeVehicule }, { headers });
  // }
  updateModel(id: string, model: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    const url = `${this.apiUrl}/${id}`; 
    return this.http.put(url, model, { headers });
  }

  // Supprimer un modèle
  deleteModel(id: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url, { headers });
  }

  getMarques(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get<any>('http://localhost:5001/api/marque/marques', { headers });
  }
  
  getTypeVehicules(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get<any>('http://localhost:5001/api/type-vehicule/typevehicules', { headers });
  }
}
