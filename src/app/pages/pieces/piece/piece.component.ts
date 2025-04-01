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
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { Router } from '@angular/router';

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
        ReactiveFormsModule,
        ProgressBarModule 
  ],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss',
  providers: [MessageService] // Ajout du service pour les notifications
})
export class PieceComponent {
  loading: boolean = true;
  pieces: any[] = [];

  constructor(private pieceService: PieceService, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.loadPieces();
  }

  loadPieces() {
    this.pieceService.getPieces().subscribe({
      next: (data) => {
        this.pieces = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      }
    });
  }

  navigateToDetail(pieceId: string) {
    if (!pieceId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'ID de pièce manquant'
      });
      return;
    }
  
    // Utilisez le chemin complet avec le préfixe 'pages'
    this.router.navigate(['/pages/pieces/detailPiece', pieceId])
      .then(success => {
        if (!success) {
          console.error('Échec de navigation - Vérifiez :');
          console.log('1. La configuration des routes');
          console.log('2. Que le composant DetailpieceComponent est bien déclaré');
          
          // Solution de repli - recharge la page
          window.location.href = `/pages/pieces/detailPiece/${pieceId}`;
        }
      });
  }
}
