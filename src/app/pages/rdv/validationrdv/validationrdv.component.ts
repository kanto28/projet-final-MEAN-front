import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ValidationrdvService } from '../../../services/validationrdv/validationrdv.service';

interface Planning {
  detailleRendez: string;  // Doit être un ObjectId valide
  user_mecanicien: string; // ObjectId
  user_gerant: string;     // ObjectId - Nouveau champ
  dates_debut: string;     // Format ISO 8601
  dates_fin: string;       // Format ISO 8601
}

@Component({
  selector: 'app-validationrdv',
  imports: [
    CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        SelectModule
  ],
  templateUrl: './validationrdv.component.html',
  styleUrl: './validationrdv.component.scss'
})
export class ValidationrdvComponent implements OnInit {
  validationData = {
    rendez: '',
    user: '',
    plannings: [] as Planning[]
  };

  successMessage = '';
  errorMessage = '';

  constructor(private validationrdvService: ValidationrdvService) {}

  ngOnInit() {
    this.addPlanning();
  }

  // onSubmit() {
  //   const payload = {
  //     ...this.validationData,
  //     plannings: this.validationData.plannings.map(p => ({
  //       ...p,
  //       dates_debut: new Date(p.dates_debut).toISOString(),
  //       dates_fin: new Date(p.dates_fin).toISOString()
  //     }))
  //   };
  
  //   console.log('Payload:', payload); // Vérifiez ce qui est envoyé
  
  //   this.validationrdvService.validerRendezVous(payload).subscribe({
  //     next: (response) => {
  //       console.log('Réponse:', response);
  //       this.successMessage = 'Validation réussie';
  //       this.errorMessage = '';
  //     },
  //     error: (err) => {
  //       console.error('Erreur:', err);
  //       this.errorMessage = err.error?.message || 'Erreur serveur';
  //       this.successMessage = '';
  //     }
  //   });
  // }

  onSubmit() {
    // Formatage des dates et préparation du payload
    const payload = {
      rendez: this.validationData.rendez,
      user: this.validationData.user,
      // Vous pouvez ajouter une date globale si nécessaire
      dates: new Date().toISOString(), // ou une autre date appropriée
      plannings: this.validationData.plannings.map(p => ({
        detailleRendez: p.detailleRendez,
        user_mecanicien: p.user_mecanicien,
        user_gerant: this.validationData.user, // On reprend le user du parent
        dates_debut: new Date(p.dates_debut).toISOString(),
        dates_fin: new Date(p.dates_fin).toISOString()
      }))
    };
  
    console.log('Payload envoyé:', payload);
  
    this.validationrdvService.validerRendezVous(payload).subscribe({
      next: (response) => {
        console.log('Réponse:', response);
        this.successMessage = 'Validation réussie';
        this.errorMessage = '';
        // Réinitialisation du formulaire si nécessaire
        this.validationData = {
          rendez: '',
          user: '',
          plannings: []
        };
        this.addPlanning(); // Réajoute un planning vide
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.errorMessage = err.error?.erreur || err.error?.message || 'Erreur serveur';
        this.successMessage = '';
      }
    });
  }
  
  addPlanning() {
    this.validationData.plannings.push({
      detailleRendez: '',
      user_mecanicien: '',
      user_gerant: this.validationData.user,
      dates_debut: '',
      dates_fin: ''
    });
  }

  removePlanning(index: number) {
    this.validationData.plannings.splice(index, 1);
  }
}