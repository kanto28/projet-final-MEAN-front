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
  selector: 'app-listepresation',
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
  templateUrl: './listepresation.component.html',
  styleUrl: './listepresation.component.scss'
})
export class ListepresationComponent {
  prestations = [
    { nomMecanicien: 'John Doe', prestation: 'Réparation moteur', date: '01/02/2025', statut: 'En cours' },
    { nomMecanicien: 'Jane Smith', prestation: 'Changement de pneu', date: '03/02/2025', statut: 'Terminé' },
    { nomMecanicien: 'Alex Dupont', prestation: 'Vidange', date: '05/02/2025', statut: 'En cours' },
    { nomMecanicien: 'Sarah Connor', prestation: 'Révision complète', date: '07/02/2025', statut: 'Terminé' },
    { nomMecanicien: 'Jean Michel', prestation: 'Diagnostic électronique', date: '10/02/2025', statut: 'En attente' },
    { nomMecanicien: 'Paul Atreides', prestation: 'Changement de batterie', date: '15/02/2025', statut: 'En cours' },
  ];

getStatusColor(statut: string): string {
  switch (statut) {
    case 'En cours': return 'badge-en-cours';
    case 'Terminé': return 'badge-termine';
    default: return 'badge-autre';
}
}
}
