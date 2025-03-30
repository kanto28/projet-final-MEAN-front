import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ModelService } from '../../../services/crud/model/model.service';
import { PrestationService } from '../../../services/crud/prestation/prestation.service';
import { PieceService } from '../../../services/pieces/piece.service';
import { Piece } from '../../../models/piece.model';

@Component({
  selector: 'app-piece',
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
        ReactiveFormsModule
  ],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceComponent {
  pieces: Piece[] = []; // Tableau pour stocker les pièces
  errorMessage: string = '';

  constructor(private pieceService: PieceService) { }

  ngOnInit(): void {
    this.loadPieces(); // Charge la liste des pièces dès que le composant est initialisé
  }

  // Fonction pour charger les pièces depuis l'API
  // Fonction pour charger les pièces depuis l'API
  loadPieces(): void {
    this.pieceService.getPieces().subscribe(
      (data: Piece[]) => {
        this.pieces = data; // Enregistre les pièces dans le tableau
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des pièces';
        console.error(error);
      }
    );
  }
}
