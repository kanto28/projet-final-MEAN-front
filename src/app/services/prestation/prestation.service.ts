import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestation } from '../../models/prestation.model';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  // private apiUrl = 'http://localhost:5001/api/prestation/prestations'; // Ton URL d'API

  // constructor(private http: HttpClient) {}

  // // Méthode pour créer une prestation
  // createPrestation(prestation: any): Observable<any> {
  //   const userId = this.getUserId(); // Récupérer l'ID de l'utilisateur connecté
  //   const prestationWithUser = { ...prestation, user: userId }; // Ajouter l'ID utilisateur à la prestation

  //   return this.http.post(this.apiUrl, prestationWithUser); // Envoyer la requête avec les données
  // }

  // // Méthode pour récupérer l'ID de l'utilisateur depuis localStorage
  // getUserId(): string {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}'); // Récupérer l'objet utilisateur depuis localStorage
  //   return user._id || ''; // Retourner l'ID de l'utilisateur
  // }
  
}