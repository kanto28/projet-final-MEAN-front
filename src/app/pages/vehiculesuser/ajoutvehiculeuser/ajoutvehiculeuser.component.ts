import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-ajoutvehiculeuser',
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
  templateUrl: './ajoutvehiculeuser.component.html',
  styleUrl: './ajoutvehiculeuser.component.scss'
})
export class AjoutvehiculeuserComponent {
// Données fictives pour les utilisateurs et les modèles
users = [
  { id: 1, name: 'Utilisateur 1' },
  { id: 2, name: 'Utilisateur 2' }
];

models = [
  { id: 1, name: 'Model A' },
  { id: 2, name: 'Model B' }
];

selectedUser = this.users[0];
selectedModel = this.models[0];

// Variables de saisie
matricule = '';
annees = '';
energie = 'Electric';
moteur = 'V8';
transmission = 'Automatique';

onSubmit() {
  console.log('Véhicule ajouté:', {
    matricule: this.matricule,
    annees: this.annees,
    model: this.selectedModel.name,
    energie: this.energie,
    moteur: this.moteur,
    transmission: this.transmission,
    user: this.selectedUser.name
  });
}
}
