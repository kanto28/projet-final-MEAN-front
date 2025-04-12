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
import { MoteurService } from '../../../services/crud/moteur/moteur.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

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
  styleUrl: './moteur.component.scss',
  providers: [MessageService]
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

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  errorMessage: string = '';

  constructor(
    private moteurService: MoteurService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

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

  // Charger la liste des moteurs
  loadMoteur(): void {
    this.loading = true;
    this.moteurService.getMoteurs().subscribe({
      next: (data) => {
        this.moteurs = data;
        console.log('Moteurs récupérés :', this.moteurs);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des moteurs', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // Créer un moteur
  onCreateMoteur() {
    if (!this.moteurName.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le nom du moteur est requis',
        life: 5000
      });
      return;
    }

    this.loading = true;
    this.moteurService.createMoteur(this.moteurName).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Moteur créé avec succès',
          life: 3000
        });
        this.ajoutMoteur = false;
        this.moteurName = '';
        this.loadMoteur();
      },
      error: (err) => {
        this.errorMessage = err.error?.erreur || 'Erreur inconnue';
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: this.errorMessage,
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  // Mettre à jour un moteur
  onUpdateMoteur() {
    if (!this.selectedMoteur?.name?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le nom du moteur est requis',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.moteurService.updateMoteur(this.selectedMoteur._id, this.selectedMoteur.name).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Moteur mis à jour avec succès',
          life: 3000
        });

        this.editMoteurDialog = false;
        this.selectedMoteur = null;
        this.loading = false;
        this.loadMoteur();
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

  // Supprimer un moteur
  onDeleteMoteur() {
    if (!this.moteurToDelete?._id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Aucun moteur sélectionné',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.moteurService.deleteMoteur(this.moteurToDelete._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Moteur supprimé avec succès',
          life: 3000
        });

        this.displayConfirmation = false;
        this.moteurToDelete = null;
        this.loadMoteur();
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
