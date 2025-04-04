import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { InscriptionService } from '../../../services/inscription.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    tel: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private inscriptionService: InscriptionService, // Utilisez le service
    private router: Router,
    private messageService: MessageService
  ) { }

  // onSubmit() {
  //   this.isLoading = true;
  //   this.errorMessage = '';

  //   // Utilisez le service au lieu de http.post directement
  //   this.inscriptionService.registerUser(this.userData)
  //     .subscribe({
  //       next: (response: any) => {
  //         this.isLoading = false;
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Succès',
  //           detail: response.message || 'Inscription réussie!'
  //         });
          
  //         this.router.navigate(['/validation'], { 
  //           state: { email: this.userData.email } 
  //         });
  //       },
  //       error: (error) => {
  //         this.isLoading = false;
  //         this.errorMessage = error.error?.erreur || error.error?.error || 'Une erreur est survenue lors de l\'inscription';
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Erreur',
  //           detail: this.errorMessage
  //         });
  //       }
  //     });
  // }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Données du formulaire avant envoi:', this.userData);
  
    this.inscriptionService.registerUser(this.userData)
      .subscribe({
        next: (response: any) => {
          console.log('Réponse complète du backend:', response);
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: response.message || 'Inscription réussie!'
          });
          this.router.navigate(['/validate'], { 
            state: { 
              email: this.userData.email,
              // Ajoutez d'autres données si nécessaire
            } 
          });
        },
        error: (error) => {
          console.error('Erreur détaillée:', error);
          console.log('Status:', error.status);
          console.log('Message:', error.message);
          console.log('Erreur complète:', JSON.stringify(error, null, 2));
          
          this.isLoading = false;
          this.errorMessage = error.error?.erreur || error.error?.error || 'Une erreur est survenue lors de l\'inscription';
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: this.errorMessage
          });
        }
      });
  }
}
