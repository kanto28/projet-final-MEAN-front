import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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
 
  getPieces(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Récupérer le token stocké
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'en-tête
    });
    return this.http.get<any[]>(`${this.apiUrl}/pieces`);
  }
  
 
  getPieceById(id: string) {
    return this.http.get(`${this.apiUrl}/pieces/${id}`).pipe(
      catchError(error => {
        console.error('Erreur API:', error);
        return throwError(() => new Error(
          error.error?.message || 
          error.message || 
          'Erreur lors de la récupération des données'
        ));
      })
    );
  }

  // // Ajouter un nouveau prix
  ajouterPrix(pieceId: string, prixData: { prix: number, date: Date }): Observable<any> {
    return this.http.post(`${this.apiUrl}/pieces/${pieceId}/prix`, {
      prix: prixData.prix,
      date: prixData.date.toISOString() // Format ISO pour le backend
    });
  }
  
  getPieceWithPrices(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pieces/${id}`).pipe(
      map((piece: any) => ({
        ...piece,
        prix: piece.prix?.sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ) || []
      }))
    );
  }

  //entree // piece.service.ts
addPieceEntry(pieceId: string, entryData: { quantity: number, userId: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/pieces/${pieceId}/entrer`, entryData);
}

// removePieceEntry(pieceId: string, data: { quantity: number; userId: string }) {
//   return this.http.post(`${this.apiUrl}/pieces/${pieceId}/sortie`, data);
// }

 // Ajoutez cette méthode
 private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}

removePieceEntry(pieceId: string, data: { quantity: number; userId: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/pieces/${pieceId}/sortie`, data, {
    headers: this.getHeaders() // Utilisation de la méthode
  });
}

//stock piece
// Récupérer l'état du stock pour toutes les pièces
getStock(): Observable<any> {
  return this.http.get(`${this.apiUrl}/pieces/stock`);
}

// Récupérer l'état du stock pour une pièce spécifique
getStockById(pieceId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/pieces/stock/${pieceId}`);
}

 // Récupérer l'historique des entrées et sorties pour une pièce spécifique
 getHistorique(pieceId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/pieces/${pieceId}/historique`);
}


}

