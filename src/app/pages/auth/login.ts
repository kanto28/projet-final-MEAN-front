import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, CommonModule, ToastModule],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="assets/car-repair.png" alt="Logo Garage" class="mb-8 w-16 shrink-0 mx-auto">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">CONNEXION</div>
                            <span class="text-muted-color font-medium">Identifiez-vous pour continuer</span>
                        </div>
                        <form (ngSubmit)="onSubmit()">

                            <!-- Message d erreur -->
                            <p-toast position="top-center" ></p-toast>

                            <div>
                                <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                                <input pInputText [(ngModel)]="email" (ngModelChange)="onInputChange()" id="email" name="email" type="email" placeholder="Votre email" class="w-full md:w-[30rem] mb-8" [(ngModel)]="email" required/>

                                <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Mot de passe</label>
                                <p-password [(ngModel)]="password" (ngModelChange)="onInputChange()" id="password" name="password" [(ngModel)]="password" placeholder="Votre mot de passe" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" required></p-password>

                                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                    <div class="flex items-center">
                                       
                                    </div>
                                    <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" routerLink="/auth/register">Pas encore de compte?</span>
                                    <!-- <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" routerLink="/auth/validate">Validation</span> -->
                                </div>
                                <p-button label="Se connecter" styleClass="w-full" type="submit" ></p-button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService] // Ajoute le service MessageService ici
})
export class Login {
    email: string = '';
    password: string = '';
    checked: boolean = false;
    errorMessage: string = '';

  
    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}
  
    onSubmit() {
        const loginData = {
          email: this.email,
          password: this.password
        };
      
        console.log('Données envoyées :', loginData);
      
        this.authService.login(loginData).subscribe({
          next: (response) => {
            console.log('Connexion réussie', response);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Erreur de connexion', err);
            // Extraire le message d'erreur
            this.errorMessage = err.error.erreur || err.error.message || 'Une erreur est survenue';
            
            // Utiliser MessageService pour afficher l'erreur dans un toast
            this.messageService.add({
                severity: 'error', // Type de message (erreur)
                summary: 'Erreur de connexion', // Titre du message
                detail: this.errorMessage, // Détails du message
                life: 5000,
            });
            
          }
        });
      }

      //Effacer le message d’erreur quand on commence à taper
      onInputChange() {
        this.errorMessage = '';
      }
      
}
