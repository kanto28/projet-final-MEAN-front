import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Piece } from '../../models/piece.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  ;private apiUrl = 'http://localhost:5001/api/piece' // Remplacez par votre URL backend


  constructor(private http: HttpClient, private router: Router) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  // piece.service.ts
  // addPiece(pieceData: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     'Content-Type': 'application/json'
  //   });

  //   // URL corrigée : /pieces au lieu de /piece/pieces
  //   return this.http.post(`${this.apiUrl}/pieces`, pieceData, { headers }).pipe(
  //     catchError(error => {
  //       console.error('Error:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }

  addPiece(pieceData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/pieces`, pieceData, { 
      headers,
      observe: 'response' // Pour avoir toute la réponse
    }).pipe(
      catchError(error => {
        console.error('Erreur complète:', error);
        if (error.status === 500) {
          console.error('Détails serveur:', error.error);
        }
        return throwError(() => error);
      })
    );
  }

  private handleAuthError() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // 1. Obtenir l'état du stock
  getStockState(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stock`);
  }

  // 2. Ajouter une nouvelle pièce
  
  
  // 3. Ajouter un prix à une pièce
  addPriceToPiece(pieceId: string, priceData: {
    prix: number;
    date?: Date;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pieceId}/prix`, priceData);
  }

  // 4. Enregistrer une entrée de pièce
  registerPieceEntry(pieceId: string, quantity: number, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pieceId}/entrer`, { quantity, userId });
  }

  // 5. Enregistrer une sortie de pièce
  registerPieceExit(pieceId: string, quantity: number, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pieceId}/sortie`, { quantity, userId });
  }

  // 6. Obtenir l'historique d'une pièce
  getPieceHistory(pieceId: string): Observable<{entrer: any[], sorties: any[]}> {
    return this.http.get<{entrer: any[], sorties: any[]}>(`${this.apiUrl}/${pieceId}/historique`);
  }

  // 7. Lier une pièce à une prestation
  linkPieceToPrestation(pieceId: string, prestationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/piece-prestation`, { pieceId, prestationId });
  }

  // 8. Supprimer un lien pièce-prestation
  unlinkPieceFromPrestation(linkId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/piece-prestation/${linkId}`);
  }
}
