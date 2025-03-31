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
  selector: 'app-affectationprestation',
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
  templateUrl: './affectationprestation.component.html',
  styleUrl: './affectationprestation.component.scss'
})
export class AffectationprestationComponent {
 // Liste des prestations
 prestations = [
  { label: 'Réparation moteur', value: 'reparation_moteur' },
  { label: 'Changement de pneu', value: 'changement_pneu' }
];

// Liste des mécaniciens
mecaniciens = [
  { label: 'John Doe', value: 'john_doe' },
  { label: 'Jane Smith', value: 'jane_smith' }
];

// Sélections de l'utilisateur
selectedPrestation: string | null = null;
selectedMecanicien: string | null = null;

// Fonction pour gérer l'affectation
affecterPrestation() {
  if (!this.selectedPrestation || !this.selectedMecanicien) {
    alert("Veuillez sélectionner une prestation et un mécanicien.");
    return;
  }

  console.log(`Prestation ${this.selectedPrestation} affectée à ${this.selectedMecanicien}`);
  alert(`✅ Prestation "${this.selectedPrestation}" affectée à "${this.selectedMecanicien}"`);
  
  // Réinitialiser la sélection après l'affectation
  this.selectedPrestation = null;
  this.selectedMecanicien = null;
}
}
