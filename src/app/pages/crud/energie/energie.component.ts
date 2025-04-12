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
import { EnergieService } from '../../../services/crud/energie/energie.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-energie',
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
    ProgressBarModule,
    HttpClientModule
  ],
  templateUrl: './energie.component.html',
  styleUrl: './energie.component.scss',
  providers: [MessageService] 
})
export class EnergieComponent implements OnInit{

  energieName: string = '';
  energies: any[] = [];
  selectedEnergie: any = null;
  editEnergieDialog: boolean = false;
  energieToDelete: any = null;

  ajoutEnergie: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  loading: boolean = false;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  errorMessage: string = '';

  constructor(
    private energieService: EnergieService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadEnergies();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger la liste des énergies
  loadEnergies(): void {
    this.loading = true;
    this.energieService.getEnergies().subscribe({
      next: (data) => {
        this.energies = data;
        console.log('Énergies récupérées :', this.energies);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des énergies', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // Créer une énergie
  onCreateEnergie() {
    this.energieService.createEnergie(this.energieName).subscribe({
      next: (energie) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Énergie créée avec succès',
          life: 3000
        });
        this.ajoutEnergie = false;
        this.energieName = '';
        this.loadEnergies();
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

  // Mettre à jour une énergie existante
  onUpdateEnergie() {
    if (!this.selectedEnergie?.name?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le nom de l\'énergie est requis',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.energieService.updateEnergie(this.selectedEnergie._id, this.selectedEnergie.name).subscribe({
      next: (updatedEnergie) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Énergie mise à jour avec succès',
          life: 3000
        });

        this.editEnergieDialog = false;
        this.selectedEnergie = null;
        this.loading = false;
        this.loadEnergies();
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

  // Supprimer une énergie existante
  onDeleteEnergie() {
    if (!this.energieToDelete?._id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Aucune énergie sélectionnée',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.energieService.deleteEnergie(this.energieToDelete._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Énergie supprimée avec succès',
          life: 3000
        });

        this.displayConfirmation = false;
        this.energieToDelete = null;
        this.loadEnergies();
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
  ovrirNouveauEnergie() {
    this.submitted = false;
    this.ajoutEnergie = true;
  }

  // Fermer le formulaire d'ajout
  hideAjoutEnergie() {
    this.ajoutEnergie = false;
  }

  // Ouvrir le formulaire de modification
  openEditEnergieDialog(energie: any) {
    this.selectedEnergie = { ...energie };
    this.editEnergieDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditEnergieDialog() {
    this.editEnergieDialog = false;
    this.selectedEnergie = null;
  }

  // Ouvrir la confirmation de suppression
  openConfirmation(energie: any) {
    this.energieToDelete = energie;
    this.displayConfirmation = true;
  }

  // Fermer la confirmation de suppression
  closeConfirmation() {
    this.displayConfirmation = false;
    this.energieToDelete = null;
  }
}
