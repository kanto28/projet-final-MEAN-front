import { Injectable } from '@angular/core';
import { environment } from '../../../environnements/environnement';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrestationprixService {

  private apiUrl = `${environment.apiBaseUrl}/prix-prestation`;
  
  constructor(private http: HttpClient, private authService: AuthService) { }
}
