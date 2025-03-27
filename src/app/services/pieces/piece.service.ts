import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piece } from '../../models/piece.model';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  private apiUrl = 'http://localhost:5001/api/piece/pieces'; // Remplacez par votre URL backend


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Ajouter une nouvelle pièce
  addPiece(pieceData: any): Observable<any> {
    return this.http.post(this.apiUrl, pieceData, { headers: this.getHeaders() });
  }

  // Récupérer toutes les pièces
  getAllPieces(): Observable<Piece[]> {
    return this.http.get<Piece[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Ajouter un prix à une pièce
  addPriceToPiece(pieceId: string, priceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pieceId}/prix`, priceData, { headers: this.getHeaders() });
  }
}
