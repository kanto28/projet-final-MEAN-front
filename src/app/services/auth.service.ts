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
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log("Réponse du backend:", response); // ✅ Debug
  
        localStorage.setItem('token', response.message); 
        localStorage.setItem('role', response.role); 
        localStorage.setItem('username', response.username); 
        localStorage.setItem('userId', response.id); // ✅ Correction ici
  
        console.log("Utilisateur connecté, ID stocké:", response.id);
      })
    );
  }
  
  getUserId(): string {
    return localStorage.getItem('userId') || ''; // Stocké après connexion
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
  getUserRole(): string {
    const role = localStorage.getItem('role')?.toLowerCase(); // Convertir en minuscule pour éviter les erreurs
    return role === 'manager' ? 'Manager' : 'Client'; // Par défaut, 'Client'
}



  // récupérer le nom d'utilisateur
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
