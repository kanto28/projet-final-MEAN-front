import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environnements/environnement';
import { TypeVehicule } from '../../../models/type-vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class TypeVehiculeService {

  private apiUrl = `${environment.apiBaseUrl}/type-vehicule/typevehicules`;

  constructor(private http: HttpClient) { }

  // Créer un nouveau type de véhicule
  createTypeVehicule(name: string): Observable<TypeVehicule> {
    return this.http.post<TypeVehicule>(this.apiUrl, { name });
  }

  // Récupérer tous les types de véhicules
  getTypeVehicules(): Observable<TypeVehicule[]> {
    return this.http.get<TypeVehicule[]>(this.apiUrl);
  }

  // Mettre à jour un type de véhicule existant
  updateTypeVehicule(id: string, name: string): Observable<TypeVehicule> {
    return this.http.put<TypeVehicule>(`${this.apiUrl}/${id}`, { name });
  }

  // Supprimer un type de véhicule existant
  deleteTypeVehicule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
