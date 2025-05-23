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
import { PieceService } from '../../../services/pieces/piece.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etatstockpiece',
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
  templateUrl: './etatstockpiece.component.html',
  styleUrl: './etatstockpiece.component.scss',
  providers: [MessageService] // Ajout du service pour les notifications
})
export class EtatstockpieceComponent {
  pieces: any[] = [];  // Liste des pièces avec leur stock
  pieceId: string = '';  // ID de la pièce pour la recherche par ID
  stock: any = null;  // Stock d'une seule pièce si besoin
  historique: any = null;  // Historique des entrées et sorties pour une pièce spécifique

  constructor(private pieceService: PieceService,private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStock();  // Appeler la méthode pour récupérer le stock des pièces
  }

  // Récupérer l'état du stock pour toutes les pièces
  getStock(): void {
    this.pieceService.getStock().subscribe(
      (data) => {
        this.pieces = data;  // Stock des pièces
      },
      (error) => {
        console.error('Erreur lors de la récupération du stock', error);
      }
    );
  }

  // Récupérer l'historique des entrées et sorties pour une seule pièce
  getHistorique(pieceId: string): void {
    this.pieceService.getHistorique(pieceId).subscribe(
      (data) => {
        this.historique = data;  // Historique des entrées et sorties
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'historique', error);
      }
    );
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
