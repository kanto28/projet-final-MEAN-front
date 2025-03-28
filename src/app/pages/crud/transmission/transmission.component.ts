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
import { TransmissionService } from '../../../services/crud/transmission/transmission.service';
import { ProgressBarModule } from 'primeng/progressbar';

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
  styleUrl: './transmission.component.scss'
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
  
  // Propriétés pour les messages
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  constructor(private transmissionService: TransmissionService) { }

  ngOnInit(): void {
    this.loadTransmission();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger les transmissions
  loadTransmission(): void {
    this.loading = true;
    this.transmissionService.getTransmissions().subscribe({
      next: (data) => {
        this.transmissions = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des transmissions', error);
        this.showAlert('error', 'Erreur lors du chargement des transmissions');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Créer une nouvelle transmission
  onCreateTransmission() {
    if (!this.transmissionName.trim()) {
      this.showAlert('error', 'Le nom de la transmission est requis');
      return;
    }

    this.loading = true;
    this.transmissionService.createTransmission(this.transmissionName).subscribe({
      next: (response) => {
        this.showAlert('success', 'Transmission créée avec succès');
        this.transmissionName = '';
        this.ajoutTransmission = false;
        this.loadTransmission();
      },
      error: (error) => {
        console.error('Erreur lors de la création de la transmission', error);
        this.showAlert('error', 'Erreur lors de la création de la transmission');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Mettre à jour une transmission
  onUpdateTransmission() {
    if (!this.selectedTransmission?.name?.trim()) {
      this.showAlert('error', 'Le nom de la transmission est requis');
      return;
    }

    this.loading = true;
    this.transmissionService.updateTransmission(this.selectedTransmission._id, this.selectedTransmission.name).subscribe({
      next: (response) => {
        this.showAlert('success', 'Transmission mise à jour avec succès');
        this.loadTransmission();
        this.editTransmissionDialog = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la transmission', error);
        this.showAlert('error', 'Erreur lors de la mise à jour de la transmission');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Supprimer une transmission
  onDeleteTransmission() {
    this.loading = true;
    this.transmissionService.deleteTransmission(this.transmissionToDelete._id).subscribe({
      next: (response) => {
        this.showAlert('success', 'Transmission supprimée avec succès');
        this.loadTransmission();
        this.displayConfirmation = false;
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la transmission', error);
        this.showAlert('error', 'Erreur lors de la suppression de la transmission');
        this.loading = false;
      },
      complete: () => {
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
