import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

@Component({
  selector: 'app-stock-dashboard',
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
        CommonModule
  ],
  templateUrl: './stock-dashboard.component.html',
  styleUrl: './stock-dashboard.component.scss',
  providers: [MessageService]
})
export class StockDashboardComponent implements OnInit{
  pieces: any[] = [];
  filteredPieces: any[] = [];
  loading = true;
  filter = '';
  totalPieces = 0;
  ruptureStock = 0;
  
  displayAddPriceDialog = false;
  selectedPieceId = '';
  newPrice = {
    price: 0,
    date: new Date()
  };

  constructor(
    private pieceService: PieceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStockData();
  }

  loadStockData(): void {
    this.pieceService.getStockState().subscribe({
      next: (data) => {
        this.pieces = data;
        this.filteredPieces = [...this.pieces];
        this.calculateSummary();
        this.loading = false;
      },
      error: (err) => {
        this.handleError('Impossible de charger les données du stock');
      }
    });
  }

  addPrice(): void {
    this.pieceService.addPriceToPiece(this.selectedPieceId, {
      prix: this.newPrice.price,
      date: this.newPrice.date
    }).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Prix ajouté avec succès'
        });
        this.displayAddPriceDialog = false;
      },
      error: (err) => {
        this.handleError('Erreur lors de l\'ajout du prix');
      }
    });
  }

  private handleError(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail
    });
    this.loading = false;
  }
 

  
 

  calculateSummary(): void {
    this.totalPieces = this.pieces.length;
    this.ruptureStock = this.pieces.filter(p => p.stock < 5).length;
  }

  applyFilter(): void {
    if (!this.filter) {
      this.filteredPieces = [...this.pieces];
      return;
    }
    
    const searchTerm = this.filter.toLowerCase();
    this.filteredPieces = this.pieces.filter(p => 
      p.piece.nom.toLowerCase().includes(searchTerm) || 
      p.piece.model.toLowerCase().includes(searchTerm));
  }

  showDetails(pieceId: string): void {
    this.router.navigate(['/pieces', pieceId, 'historique']);
  }

  showAddPriceDialog(pieceId: string): void {
    this.selectedPieceId = pieceId;
    this.newPrice = { price: 0, date: new Date() };
    this.displayAddPriceDialog = true;
  }

  
}
