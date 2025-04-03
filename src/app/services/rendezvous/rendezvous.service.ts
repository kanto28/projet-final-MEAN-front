import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendezVousResponse } from '../../models/rendezvous-response.model';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  private apiUrl = 'http://localhost:5001/api/rendezvous';

  constructor(private http: HttpClient) { }

  createRendezVous(data: any): Observable<RendezVousResponse> {
    return this.http.post<RendezVousResponse>(`${this.apiUrl}/rendezvous`, data);
  }
  getRendezVousList() {
    return this.http.get(`${this.apiUrl}/rendezvous`);
  }

  getRendezVousDetails(id: string) {
    return this.http.get(`${this.apiUrl}/rendezvous/${id}`);
  }

  
}