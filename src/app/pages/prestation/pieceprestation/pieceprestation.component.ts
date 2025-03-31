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

@Component({
  selector: 'app-pieceprestation',
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
  templateUrl: './pieceprestation.component.html',
  styleUrl: './pieceprestation.component.scss'
})
export class PieceprestationComponent implements OnInit{
// Données de prestation
prestations: any[] = [
  { nomMecanicien: 'John Doe', prestation: 'Réparation moteur', date: '01/02/2025', statut: 'En cours' },
  { nomMecanicien: 'Jane Smith', prestation: 'Changement de pneu', date: '03/02/2025', statut: 'Terminée' },
  { nomMecanicien: 'Alex Johnson', prestation: 'Vidange huile', date: '05/02/2025', statut: 'En cours' },
  { nomMecanicien: 'Emma Brown', prestation: 'Réparation frein', date: '07/02/2025', statut: 'Terminée' },
  { nomMecanicien: 'Chris Green', prestation: 'Changement de batterie', date: '10/02/2025', statut: 'En cours' },
  { nomMecanicien: 'Sophia White', prestation: 'Changement d\'huile moteur', date: '12/02/2025', statut: 'Terminée' },
  { nomMecanicien: 'James Black', prestation: 'Réparation transmission', date: '15/02/2025', statut: 'En cours' }
];

// Variable pour pagination
prestationsPaginated: any[] = [];
totalRecords: number | undefined;

constructor() { }

ngOnInit(): void {
  this.totalRecords = this.prestations.length;
  this.prestationsPaginated = this.prestations.slice(0, 5); // Initialiser avec les 5 premiers éléments
}

// Fonction de mise à jour de la pagination
onPageChange(event: any) {
  const start = event.first;
  const end = start + event.rows;
  this.prestationsPaginated = this.prestations.slice(start, end);
}

// Fonction pour obtenir la couleur du badge en fonction du statut
getStatusColor(statut: string) {
  switch (statut) {
    case 'En cours':
      return 'bg-blue-500 text-white';
    case 'Terminée':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}
}
