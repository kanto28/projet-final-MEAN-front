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
import { EnergieService } from '../../../services/crud/energie/energie.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';

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
  styleUrl: './energie.component.scss'
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
  
  // Propriétés pour les messages
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  constructor(private energieService: EnergieService) { }

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

  // Charger les énergies
  loadEnergies(): void {
    this.loading = true;
    this.energieService.getEnergies().subscribe({
      next: (data) => {
        this.energies = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des énergies', error);
        this.showAlert('error', 'Erreur lors du chargement des énergies');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Créer une nouvelle énergie
  onCreateEnergie() {
    if (!this.energieName.trim()) {
      this.showAlert('error', 'Le nom de l\'énergie est requis');
      return;
    }

    this.loading = true;
    this.energieService.createEnergie(this.energieName).subscribe({
      next: (response) => {
        this.showAlert('success', 'Énergie créée avec succès');
        this.energieName = '';
        this.ajoutEnergie = false;
        this.loadEnergies();
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'énergie', error);
        this.showAlert('error', 'Erreur lors de la création de l\'énergie');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Mettre à jour une énergie
  onUpdateEnergie() {
    if (!this.selectedEnergie?.name?.trim()) {
      this.showAlert('error', 'Le nom de l\'énergie est requis');
      return;
    }

    this.loading = true;
    this.energieService.updateEnergie(this.selectedEnergie._id, this.selectedEnergie.name).subscribe({
      next: (response) => {
        this.showAlert('success', 'Énergie mise à jour avec succès');
        this.loadEnergies();
        this.editEnergieDialog = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'énergie', error);
        this.showAlert('error', 'Erreur lors de la mise à jour de l\'énergie');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Supprimer une énergie
  onDeleteEnergie() {
    this.loading = true;
    this.energieService.deleteEnergie(this.energieToDelete._id).subscribe({
      next: (response) => {
        this.showAlert('success', 'Énergie supprimée avec succès');
        this.loadEnergies();
        this.displayConfirmation = false;
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'énergie', error);
        this.showAlert('error', 'Erreur lors de la suppression de l\'énergie');
        this.loading = false;
      },
      complete: () => {
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
