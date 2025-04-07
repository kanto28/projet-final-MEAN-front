import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl = `${environment.apiBaseUrl}/inscription`;

  constructor(private http: HttpClient) { }

 
  registerUser(userData: any): Observable<any> {
    console.log('Données envoyées au backend:', JSON.stringify(userData, null, 2));
    console.log('URL complète:', `${this.apiUrl}/formulaire`);
    
    return this.http.post(`${this.apiUrl}/formulaire`, userData)
      .pipe(
        tap({
          next: (response) => console.log('Réponse du backend:', response),
          error: (error) => console.error('Erreur du backend:', error)
        }));
    
}

validateCode(validationData: {email: string, securityCode: string}): Observable<any> {
  return this.http.post(`${this.apiUrl}/validateCode`, validationData);
}
}
