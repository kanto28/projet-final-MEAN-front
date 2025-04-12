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
import { TransmissionService } from '../../../services/crud/transmission/transmission.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transmission',
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
  templateUrl: './transmission.component.html',
  styleUrl: './transmission.component.scss',
  providers: [MessageService] 
})
export class TransmissionComponent implements OnInit{

  transmissionName: string = '';
  transmissions: any[] = [];
  selectedTransmission: any = null;
  editTransmissionDialog: boolean = false;
  transmissionToDelete: any = null;

  ajoutTransmission: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  loading: boolean = false;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  errorMessage: string = '';

  constructor(
    private transmissionService: TransmissionService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadTransmissions();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger la liste des transmissions
  loadTransmissions(): void {
    this.loading = true;
    this.transmissionService.getTransmissions().subscribe({
      next: (data) => {
        this.transmissions = data;
        console.log('Transmissions récupérées :', this.transmissions);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des Transmissions', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // Créer une transmission
  onCreateTransmission() {
    if (!this.transmissionName.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le nom de la transmission est requis',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.transmissionService.createTransmission(this.transmissionName).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Transmission créée avec succès',
          life: 3000
        });
        this.ajoutTransmission = false;
        this.transmissionName = '';
        this.loadTransmissions();
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

  // Mettre à jour une transmission existante
  onUpdateTransmission() {
    if (!this.selectedTransmission?.name?.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le nom de la transmission est requis',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.transmissionService.updateTransmission(this.selectedTransmission._id, this.selectedTransmission.name).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Transmission mise à jour avec succès',
          life: 3000
        });

        this.editTransmissionDialog = false;
        this.selectedTransmission = null;
        this.loading = false;
        this.loadTransmissions();
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

  // Supprimer une transmission existante
  onDeleteTransmission() {
    if (!this.transmissionToDelete?._id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Aucune transmission sélectionnée',
        life: 5000
      });
      return;
    }

    this.loading = true;

    this.transmissionService.deleteTransmission(this.transmissionToDelete._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Transmission supprimée avec succès',
          life: 3000
        });

        this.displayConfirmation = false;
        this.transmissionToDelete = null;
        this.loadTransmissions();
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
  ovrirNouveauTransmission() {
    this.submitted = false;
    this.ajoutTransmission = true;
  }

  // Fermer le formulaire d'ajout
  hideAjoutTransmission() {
    this.ajoutTransmission = false;
  }

  // Ouvrir le formulaire de modification
  openEditTransmissionDialog(transmission: any) {
    this.selectedTransmission = { ...transmission };
    this.editTransmissionDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditTransmissionDialog() {
    this.editTransmissionDialog = false;
    this.selectedTransmission = null;
  }

  // Ouvrir la confirmation de suppression
  openConfirmation(transmission: any) {
    this.transmissionToDelete = transmission;
    this.displayConfirmation = true;
  }

  // Fermer la confirmation de suppression
  closeConfirmation() {
    this.displayConfirmation = false;
    this.transmissionToDelete = null;
  }
}
