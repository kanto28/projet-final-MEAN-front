import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environnements/environnement';
import { Model } from '../../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  
  private apiUrl = `${environment.apiBaseUrl}/model/models`;

  constructor(private http: HttpClient) {}

  // --- Méthodes CRUD simplifiées ---

  // Créer un modèle
  createModel(name: string, marque: string, typeVehicule: string): Observable<Model> {
    return this.http.post<any>(this.apiUrl, { name, marque, typeVehicule });
  }

  // Récupérer tous les modèles
  getModels(): Observable<Model[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Mettre à jour un modèle
  updateModel(id: string, model: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, model);
  }

  // Supprimer un modèle
  deleteModel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer toutes les marques
  getMarques(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/marque/marques`);
  }

  // Récupérer tous les types de véhicule
  getTypeVehicules(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/type-vehicule/typevehicules`);
  }
}
