import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { MoteurService } from '../../../services/crud/moteur/moteur.service';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-moteur',
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
  templateUrl: './moteur.component.html',
  styleUrl: './moteur.component.scss'
})
export class MoteurComponent implements OnInit{
  moteurName: string = '';
  moteurs: any[] = [];
  selectedMoteur: any = null;
  editMoteurDialog: boolean = false;
  moteurToDelete: any = null;
  ajoutMoteur: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  loading: boolean = false;
  
  // Propriétés pour les messages
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  constructor(private moteurService: MoteurService) { }

  ngOnInit(): void {
    this.loadMoteur();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger les moteurs
  loadMoteur(): void {
    this.loading = true;
    this.moteurService.getMoteurs().subscribe({
      next: (data) => {
        this.moteurs = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des moteurs', error);
        this.showAlert('error', 'Erreur lors du chargement des moteurs');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Créer un nouveau moteur
  onCreateMoteur() {
    if (!this.moteurName.trim()) {
      this.showAlert('error', 'Le nom du moteur est requis');
      return;
    }

    this.loading = true;
    this.moteurService.createMoteur(this.moteurName).subscribe({
      next: (response) => {
        this.showAlert('success', 'Moteur créé avec succès');
        this.moteurName = '';
        this.ajoutMoteur = false;
        this.loadMoteur();
      },
      error: (error) => {
        console.error('Erreur lors de la création du moteur', error);
        this.showAlert('error', 'Erreur lors de la création du moteur');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Mettre à jour un moteur
  onUpdateMoteur() {
    if (!this.selectedMoteur?.name?.trim()) {
      this.showAlert('error', 'Le nom du moteur est requis');
      return;
    }

    this.loading = true;
    this.moteurService.updateMoteur(this.selectedMoteur._id, this.selectedMoteur.name).subscribe({
      next: (response) => {
        this.showAlert('success', 'Moteur mis à jour avec succès');
        this.loadMoteur();
        this.editMoteurDialog = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du moteur', error);
        this.showAlert('error', 'Erreur lors de la mise à jour du moteur');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Supprimer un moteur
  onDeleteMoteur() {
    this.loading = true;
    this.moteurService.deleteMoteur(this.moteurToDelete._id).subscribe({
      next: (response) => {
        this.showAlert('success', 'Moteur supprimé avec succès');
        this.loadMoteur();
        this.displayConfirmation = false;
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du moteur', error);
        this.showAlert('error', 'Erreur lors de la suppression du moteur');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Ouvrir le formulaire d'ajout
  ovrirNouveauMoteur() {
    this.submitted = false;
    this.ajoutMoteur = true;
  }

  // Fermer le formulaire d'ajout
  hideAjoutMoteur() {
    this.ajoutMoteur = false;
  }

  // Ouvrir le formulaire de modification
  openEditMoteurDialog(moteur: any) {
    this.selectedMoteur = { ...moteur };
    this.editMoteurDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditMoteurDialog() {
    this.editMoteurDialog = false;
    this.selectedMoteur = null;
  }

  // Ouvrir la confirmation de suppression
  openConfirmation(moteur: any) {
    this.moteurToDelete = moteur;
    this.displayConfirmation = true;
  }
  
  // Fermer la confirmation de suppression
  closeConfirmation() {
    this.displayConfirmation = false;
    this.moteurToDelete = null;
  }
}
