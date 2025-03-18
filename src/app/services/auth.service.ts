import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5001'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Méthode pour l'inscription
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/formulaire`, userData);
  }

  // Méthode pour la connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials); // Remplacez par l'endpoint de connexion de votre backend
  }
}
