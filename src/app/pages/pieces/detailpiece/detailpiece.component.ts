import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-detailpiece',
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
        ProgressBarModule,
        SelectModule
  ],
  templateUrl: './detailpiece.component.html',
  styleUrl: './detailpiece.component.scss',
  providers: [MessageService]
})
export class DetailpieceComponent {

  piece: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pieceService: PieceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPiece(id);
    } else {
      this.showError('ID de pièce manquant');
    }
  }

  loadPiece(id: string) {
    this.loading = true;
    this.error = null;

    this.pieceService.getPieceById(id).subscribe({
      next: (data) => {
        this.piece = data;
        this.loading = false;
      },
      error: (err) => {
        this.showError(err.message || 'Erreur de chargement');
        this.loading = false;
      }
    });
  }

  private showError(message: string) {
    this.error = message;
    console.error('Erreur:', message); // Log dans la console
  }
}
