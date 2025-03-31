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
  selector: 'app-modifvehiculeuser',
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
  templateUrl: './modifvehiculeuser.component.html',
  styleUrl: './modifvehiculeuser.component.scss'
})
export class ModifvehiculeuserComponent {
// Données fictives pour la modification
vehicule = {
  matricule: 'AB123CD',
  annees: '2020',
  model: 'Model X',
  energie: 'Electric',
  moteur: 'V8',
  transmission: 'Automatique'
};

// Données fictives pour les utilisateurs et modèles
users = [
  { id: 1, name: 'Utilisateur 1' },
  { id: 2, name: 'Utilisateur 2' }
];

models = [
  { id: 1, name: 'Model A' },
  { id: 2, name: 'Model B' }
];

selectedModel = this.models[0];
selectedUser = this.users[0];

onSubmit() {
  console.log('Véhicule modifié:', this.vehicule);
}
}
