import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-prixpiece',
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
            ConfirmDialogModule
  ],
  templateUrl: './prixpiece.component.html',
  styleUrl: './prixpiece.component.scss'
})
export class PrixpieceComponent {
  ajoutPrix: boolean = false;

  // Liste statique des prix
  prixList = [
    { date: '2024-03-01', montant: '150' },
    { date: '2024-06-15', montant: '160' },
    { date: '2024-09-20', montant: '170' }
  ];

  ouvrirAjoutPrix() {
    this.ajoutPrix = true;
  }

  fermerAjoutPrix() {
    this.ajoutPrix = false;
  }
}
