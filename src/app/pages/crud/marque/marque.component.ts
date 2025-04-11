import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { MarqueService } from '../../../services/crud/marque/marque.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-marque',
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
    ProgressBarModule
  ],
  templateUrl: './marque.component.html',
  styleUrl: './marque.component.scss',
  providers: [MessageService] 
})
export class MarqueComponent implements OnInit{

  marqueName: string = '';
  marques: any[] = [];
  selectedMarque: any = null;
  editMarqueDialog: boolean = false;
  marqueToDelete: any = null;

  ajoutMarque: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  loading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  errorMessage: string = '';
  

  constructor(
    private marqueService: MarqueService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadMarque();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger la liste des marques
  loadMarque(): void {
    this.loading = true;
    this.marqueService.getMarques().subscribe({
      next: (data) => {
        this.marques = data;
        console.log('Marques récupérées :', this.marques);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des Marques', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

   // Créer une marque
   onCreateMarque() {
    this.marqueService.createMarque(this.marqueName).subscribe({
      next: (marque) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Marque créée avec succès',
          life: 3000
        });
        this.ajoutMarque = false; // Ferme le formulaire d'ajout
        this.marqueName = ''; // Reset le champ
        this.loadMarque(); // Recharge la liste des marques
      },
      error: (err) => {
        this.errorMessage = err.error?.erreur || 'Erreur inconnue';
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: this.errorMessage,
          life: 5000
        });
      }
    });
  }



  // Mettre à jour une Marque existante
  onUpdateMarque() {
    // Validation
    if (!this.selectedMarque?.name?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le nom de la marque est requis',
        life: 5000
      });
      return;
    }

    this.loading = true;
    
    this.marqueService.updateMarque(this.selectedMarque._id, this.selectedMarque.name).subscribe({
      next: (updatedMarque) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Marque mise à jour avec succès',
          life: 3000
        });
        
        // Fermeture du dialogue d'édition
        this.editMarqueDialog = false;
        
        // Réinitialisation
        this.selectedMarque = null;
        this.loading = false;
        
        // Rechargement de la liste
        this.loadMarque();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.erreur || 'Erreur lors de la mise à jour',
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  // Supprimer une Marque existante
  onDeleteMarque() {
    if (!this.marqueToDelete?._id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Aucune marque sélectionnée',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.marqueService.deleteMarque(this.marqueToDelete._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Marque supprimée avec succès',
          life: 3000
        });
        
        // 1. Fermer la boîte de confirmation
        this.displayConfirmation = false;
        
        // 2. Réinitialiser la sélection
        this.marqueToDelete = null;
        
        // 3. Recharger la liste
        this.loadMarque();
        
        // 4. Désactiver le loading
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.erreur || 'Erreur lors de la suppression',
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  // Ouvrir le formulaire d'ajout
  ovrirNouveauMarque() {
    this.submitted = false;
    this.ajoutMarque = true;
  }

  // Fermer le formulaire d'ajout
  hideAjoutMarque() {
    this.ajoutMarque = false;
  }

  // Ouvrir le formulaire de modification
  openEditMarqueDialog(marque: any) {
    this.selectedMarque = { ...marque };
    this.editMarqueDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditMarqueDialog() {
    this.editMarqueDialog = false;
    this.selectedMarque = null;
  }

  // Ouvrir la confirmation de suppression
  openConfirmation(marque: any) {
    this.marqueToDelete = marque;
    this.displayConfirmation = true;
  }
  
  // Fermer la confirmation de suppression
  closeConfirmation() {
    this.displayConfirmation = false;
    this.marqueToDelete = null;
  }

}
