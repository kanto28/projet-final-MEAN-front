import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Prestation } from '../../../models/prestation.model';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  private apiUrl = 'http://localhost:5001/api/prestation/prestations';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


 // Créer une prestation
 createPrestation(prestationData: { name: string, duree: number, typeVehicule: string }): Observable<Prestation> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const dataWithUser = { 
    ...prestationData, 
    user: user._id 
  };
  
  console.log('Données envoyées:', dataWithUser);
  
  return this.http.post<Prestation>(this.apiUrl, dataWithUser, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur création prestation:', error);
      throw error;
    })
  );
}

// Mettre à jour une prestation
updatePrestation(id: string, prestationData: { name: string, duree: number, typeVehicule: string }): Observable<Prestation> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const url = `${this.apiUrl}/${id}`;
  const dataWithUser = {
    ...prestationData,
    user: user._id // Ajout cohérent du user._id
  };

  console.log('Données mises à jour:', dataWithUser);
  
  return this.http.put<Prestation>(url, dataWithUser, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur mise à jour prestation:', error);
      throw error;
    })
  );
}


  // Créer une prestation avec prix (réservé au Manager)
  createPrestationWithPrice(prestationData: { name: string, duree: number, typeVehicule: string, prix: number }): Observable<any> {
    const url = `${this.apiUrl}-prix`;
    return this.http.post(url, prestationData, { headers: this.getHeaders() });
  }

  // Récupérer toutes les prestations
  getAllPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Récupérer tous les modèles
  getPrestations(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Récupérer les prestations par type de véhicule
  getPrestationsByVehicleType(typeVehiculeId: string): Observable<Prestation[]> {
    const url = `${this.apiUrl}/type/${typeVehiculeId}`;
    return this.http.get<Prestation[]>(url, { headers: this.getHeaders() });
  }

  
  // Supprimer une prestation
  deletePrestation(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
