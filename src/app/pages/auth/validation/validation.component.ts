import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { MessageService } from 'primeng/api';
import { InscriptionService } from '../../../services/inscription.service';

@Component({
  selector: 'app-validation',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, CommonModule],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss',
  providers: [MessageService]
})
export class ValidationComponent {
  email: string = '';
  securityCode: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inscriptionService: InscriptionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Récupère l'email depuis le state de navigation
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras.state?.['email'] || '';
    
    if (!this.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Email non fourni, veuillez recommencer l\'inscription'
      });
      this.router.navigate(['/register']);
    }
  }

  onSubmit() {
    this.isLoading = true;
    
    this.inscriptionService.validateCode({
      email: this.email,
      securityCode: this.securityCode
    }).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: response.message
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.error?.erreur || 'Erreur lors de la validation'
        });
      }
    });
  }
}
