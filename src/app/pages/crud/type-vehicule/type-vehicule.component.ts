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
import { TypeVehiculeService } from '../../../services/crud/typeVehicule/type-vehicule.service';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-type-vehicule',
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
  templateUrl: './type-vehicule.component.html',
  styleUrl: './type-vehicule.component.scss'
})
export class TypeVehiculeComponent implements OnInit{

  typeVehiculeName: string = '';
  typeVehicules: any[] = [];
  selectedTypeVehicule: any = null;
  editTypeVehiculeDialog: boolean = false;
  typeVehiculeToDelete: any = null;
  ajoutTypeVehicule: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  loading: boolean = false;
  
  // Propriétés pour les messages
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  constructor(private typeVehiculeService: TypeVehiculeService) { }

  ngOnInit(): void {
    this.loadTypeVehicule();
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger les types de véhicules
  loadTypeVehicule(): void {
    this.loading = true;
    this.typeVehiculeService.getTypeVehicules().subscribe({
      next: (data) => {
        this.typeVehicules = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des types de véhicule', error);
        this.showAlert('error', 'Erreur lors du chargement des types de véhicule');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Créer un nouveau type de véhicule
  onCreateTypeVehicule() {
    if (!this.typeVehiculeName.trim()) {
      this.showAlert('error', 'Le nom du type de véhicule est requis');
      return;
    }

    this.loading = true;
    this.typeVehiculeService.createTypeVehicule(this.typeVehiculeName).subscribe({
      next: (response) => {
        this.showAlert('success', 'Type de véhicule créé avec succès');
        this.typeVehiculeName = '';
        this.ajoutTypeVehicule = false;
        this.loadTypeVehicule();
      },
      error: (error) => {
        console.error('Erreur lors de la création du type de véhicule', error);
        this.showAlert('error', 'Erreur lors de la création du type de véhicule');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Mettre à jour un type de véhicule
  onUpdateTypeVehicule() {
    if (!this.selectedTypeVehicule?.name?.trim()) {
      this.showAlert('error', 'Le nom du type de véhicule est requis');
      return;
    }

    this.loading = true;
    this.typeVehiculeService.updateTypeVehicule(this.selectedTypeVehicule._id, this.selectedTypeVehicule.name).subscribe({
      next: (response) => {
        this.showAlert('success', 'Type de véhicule mis à jour avec succès');
        this.loadTypeVehicule();
        this.editTypeVehiculeDialog = false;
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du type de véhicule', error);
        this.showAlert('error', 'Erreur lors de la mise à jour du type de véhicule');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Supprimer un type de véhicule
  onDeleteTypeVehicule() {
    this.loading = true;
    this.typeVehiculeService.deleteTypeVehicule(this.typeVehiculeToDelete._id).subscribe({
      next: (response) => {
        this.showAlert('success', 'Type de véhicule supprimé avec succès');
        this.loadTypeVehicule();
        this.displayConfirmation = false;
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du type de véhicule', error);
        this.showAlert('error', 'Erreur lors de la suppression du type de véhicule');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Ouvrir le formulaire d'ajout
  ovrirNouveauTypeVehicule() {
    this.submitted = false;
    this.ajoutTypeVehicule = true;
  }

  // Fermer le formulaire d'ajout
  hideAjoutTypeVehicule() {
    this.ajoutTypeVehicule = false;
  }

  // Ouvrir le formulaire de modification
  openEditTypeVehiculeDialog(typeVehicule: any) {
    this.selectedTypeVehicule = { ...typeVehicule };
    this.editTypeVehiculeDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditTypeVehiculeDialog() {
    this.editTypeVehiculeDialog = false;
    this.selectedTypeVehicule = null;
  }

  // Ouvrir la confirmation de suppression
  openConfirmation(typeVehicule: any) {
    this.typeVehiculeToDelete = typeVehicule;
    this.displayConfirmation = true;
  }
  
  // Fermer la confirmation de suppression
  closeConfirmation() {
    this.displayConfirmation = false;
    this.typeVehiculeToDelete = null;
  }

}

