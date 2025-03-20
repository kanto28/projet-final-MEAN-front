import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(userData: { username: string; email: string; password: string; tel: string; roleName: string; }) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:5001/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  // Se Connecter
  // login(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((response: any) => {
  //       localStorage.setItem('token', response.message);
  //       localStorage.setItem('role', response.role);
  //       localStorage.setItem('username', response.username);
  //     })
  //   );
  // }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('token', response.message); // Token d'authentification
        localStorage.setItem('role', response.role); // Rôle de l'utilisateur
        localStorage.setItem('username', response.username); // Nom d'utilisateur
        localStorage.setItem('user', JSON.stringify({ _id: response._id })); // ID de l'utilisateur
      })
    );
  }

  // vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  //se déconnecter
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login']);
  }

  // récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // récupérer le rôle de l'utilisateur
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // récupérer le nom d'utilisateur
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
