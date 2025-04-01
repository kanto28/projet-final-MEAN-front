import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Piece } from '../../models/piece.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  private apiUrl = 'http://localhost:5001/api/piece'; // URL de votre API

  constructor(private http: HttpClient, private router: Router) { }


  // ✅ Méthode corrigée avec le token
  ajouterPiece(pieceData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête
    });

    return this.http.post<any>(`${this.apiUrl}/pieces`, pieceData, { headers });
  }

  

//   private apiUrl = 'http://localhost:5001/api/piece'; // Remplacez par votre URL backend


//   constructor(private http: HttpClient, private router: Router) { }

//   private getHeaders() {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }


//   addPiece(pieceData: any): Observable<any> {
//     const headers = this.getHeaders();
  
//     return this.http.post(`${this.apiUrl}/pieces`, pieceData, { 
//       headers,
//       observe: 'response' // Pour avoir toute la réponse
//     }).pipe(
//       catchError(error => {
//         console.error('Erreur complète:', error);
//         if (error.status === 500) {
//           console.error('Détails serveur:', error.error);
//         }
//         return throwError(() => error);
//       })
//     );
//   }
  

 

//   // Ajoutez une méthode dans le service pour récupérer la liste des pièces
// getPieces(): Observable<Piece[]> {
//   return this.http.get<Piece[]>(`${this.apiUrl}/pieces`, { headers: this.getHeaders() })
//     .pipe(
//       catchError(error => {
//         console.error('Erreur lors de la récupération des pièces', error);
//         return throwError(() => error);
//       })
//     );
// }

  
  
}
