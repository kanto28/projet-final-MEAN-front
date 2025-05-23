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
  selector: 'app-detailprestation',
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
  templateUrl: './detailprestation.component.html',
  styleUrl: './detailprestation.component.scss'
})
export class DetailprestationComponent {
  prestation = {
    nomMecanicien: 'John Doe',
    prestation: 'Réparation moteur',
    date: '01/02/2025',
    statut: 'En cours',
    commentaires: 'La réparation est en cours, remplacement du filtre à huile nécessaire.'
  };

  getStatusColor(statut: string): string {
    switch (statut) {
      case 'En cours': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300';
      case 'Terminé': return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300';
      case 'En attente': return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  }
}
