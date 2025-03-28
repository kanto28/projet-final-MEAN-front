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
  styleUrl: './marque.component.scss'
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

  constructor(
    private marqueService: MarqueService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadMarque();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    
    // Masquer le message après 5 secondes
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

  // Créer une nouvelle Marque
  onCreateMarque() {
    if (!this.marqueName.trim()) {
      this.showAlert('error', 'Le nom de la marque est requis');
      return;
    }

    this.loading = true;
    this.marqueService.createMarque(this.marqueName).subscribe({
      next: (response) => {
        this.marques.push(response);
        this.marqueName = '';
        this.ajoutMarque = false;
        this.showAlert('success', 'Marque créée avec succès');
        this.loadMarque();
      },
      error: (error) => {
        console.error(error);
        this.showAlert('error', 'Erreur lors de la création de la marque');
        this.loading = false;
      }
    });
  }

  // Mettre à jour une Marque existante
  onUpdateMarque() {
    if (!this.selectedMarque?.name?.trim()) {
      this.showAlert('error', 'Le nom de la marque est requis');
      return;
    }

    this.loading = true;
    this.marqueService.updateMarque(this.selectedMarque._id, this.selectedMarque.name).subscribe({
      next: (response) => {
        this.showAlert('success', 'Marque mise à jour avec succès');
        this.loadMarque();
        this.editMarqueDialog = false;
      },
      error: (error) => {
        console.error(error);
        this.showAlert('error', 'Erreur lors de la mise à jour de la marque');
        this.loading = false;
      }
    });
  }

  // Supprimer une Marque existante
  onDeleteMarque() {
    this.loading = true;
    this.marqueService.deleteMarque(this.marqueToDelete._id).subscribe({
      next: (response) => {
        this.showAlert('success', 'Marque supprimée avec succès');
        this.loadMarque();
        this.displayConfirmation = false;
      },
      error: (error) => {
        console.error(error);
        this.showAlert('error', 'Erreur lors de la suppression de la marque');
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
