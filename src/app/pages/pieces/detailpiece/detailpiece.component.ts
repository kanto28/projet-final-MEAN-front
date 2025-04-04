import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SortByDatePipe } from '../../../pipe/sort-by-date.pipe';
import { AuthService } from '../../../services/auth.service';

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

  // Nouveaux états pour l'ajout de prix
  showPriceForm = false;
  newPrice = {
    prix: null as number | null,
    date: new Date().toISOString().substring(0, 10) // Date du jour par défaut
  };
  priceFormError: string | null = null;

  // detailpiece.component.ts
  showEntryForm = false;
  newEntry = {
    quantity: null as number | null,
    userId: '' // Vous pourriez pré-remplir avec l'ID de l'utilisateur connecté
  };
  entryFormError: string | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  //sortie
  showExitForm = false;
  newExit = {
    quantity: null as number | null,
    userId: ''
  };
  exitFormError: string | null = null;
  exitSuccessMessage: string | null = null;
  exitErrorMessage: string | null = null;

  pieceId: string = '';  // ID de la pièce
  mouvements: any[] = [];  // Historique des mouvements (entrées et sorties)



  constructor(
    private route: ActivatedRoute,
    private pieceService: PieceService,
    private fb: FormBuilder,
    private authService: AuthService
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

  // Ajoutez ces nouvelles méthodes :
  togglePriceForm() {
    this.showPriceForm = !this.showPriceForm;
    this.priceFormError = null;
  }

  addPrice() {
    if (!this.newPrice.prix || this.newPrice.prix <= 0) {
      this.priceFormError = 'Veuillez entrer un prix valide';
      return;
    }

    const pieceId = this.route.snapshot.paramMap.get('id');
    if (!pieceId) return;

    this.pieceService.ajouterPrix(pieceId, {
      prix: this.newPrice.prix,
      date: new Date(this.newPrice.date)
    }).subscribe({
      next: (response) => {
        // Recharger les données de la pièce
        this.loadPiece(pieceId);
        this.showPriceForm = false;
        this.newPrice = {
          prix: null,
          date: new Date().toISOString().substring(0, 10)
        };
      },
      error: (err) => {
        this.priceFormError = err.error?.message || 'Erreur lors de l\'ajout du prix';
      }
    });
  }

  //entre de stock
toggleEntryForm() {
  this.showEntryForm = !this.showEntryForm;
  this.entryFormError = null;
}


addEntry() {
  if (!this.newEntry.quantity || this.newEntry.quantity <= 0) {
    this.errorMessage = 'La quantité doit être supérieure à 0';
    return;
  }

  const pieceId = this.route.snapshot.paramMap.get('id');
  if (!pieceId) return;

  const userId = this.authService.getUserId(); 
  if (!userId) {
    this.errorMessage = "Erreur : ID utilisateur introuvable.";
    return;
  }

  this.pieceService.addPieceEntry(pieceId, {
    quantity: this.newEntry.quantity,
    userId: userId
  }).subscribe({
    next: () => {
      this.successMessage = "Entrée ajoutée avec succès !";
      this.errorMessage = null;
      this.loadPiece(pieceId);
      this.showEntryForm = false;
      this.newEntry = { quantity: null, userId: '' };

      // Effacer le message après 3 secondes
      setTimeout(() => { this.successMessage = null; }, 3000);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || "Erreur lors de l'enregistrement";
      this.successMessage = null;

      // Effacer le message après 3 secondes
      setTimeout(() => { this.errorMessage = null; }, 3000);
    }
  });
}

toggleExitForm() {
  this.showExitForm = !this.showExitForm;
  this.exitFormError = null;
}

// Méthode pour enregistrer une sortie de stock
addExit() {
  if (!this.newExit.quantity || this.newExit.quantity <= 0) {
    this.exitErrorMessage = 'La quantité doit être supérieure à 0';
    return;
  }

  const pieceId = this.route.snapshot.paramMap.get('id');
  if (!pieceId) {
    this.exitErrorMessage = 'ID de pièce manquant';
    return;
  }

  const userId = this.authService.getUserId();
  if (!userId) {
    this.exitErrorMessage = 'Utilisateur non authentifié';
    return;
  }

  this.pieceService.removePieceEntry(pieceId, {
    quantity: this.newExit.quantity,
    userId: userId
  }).subscribe({
    next: () => {
      this.exitSuccessMessage = 'Sortie enregistrée avec succès!';
      this.loadPiece(pieceId);
      this.resetExitForm();
    },
    error: (err) => {
      this.handleExitError(err);
    }
  });
}

private resetExitForm() {
  this.showExitForm = false;
  this.newExit = { quantity: null, userId: '' };
  setTimeout(() => this.exitSuccessMessage = null, 3000);
}

private handleExitError(err: any) {
  console.error('Erreur sortie:', err);
  
  if (err.status === 400) {
    this.exitErrorMessage = err.error?.erreur || 'Erreur de validation';
  } else if (err.status === 401) {
    this.exitErrorMessage = 'Authentification requise';
  } else {
    this.exitErrorMessage = 'Erreur serveur';
  }
  
  setTimeout(() => this.exitErrorMessage = null, 3000);
}


}
