import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
import { PrestationService } from '../../../services/crud/prestation/prestation.service';
import { TypeVehiculeService } from '../../../services/crud/typeVehicule/type-vehicule.service';
import { Prestation } from '../../../models/prestation.model';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-prestation',
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
    ProgressBarModule,
    DropdownModule,
    ConfirmDialogModule
  ],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.scss'
})
export class PrestationComponent implements OnInit {
  // Ajoutez cette méthode dans votre classe PrestationComponent
resetForm(): void {
  this.prestationName = '';
  this.prestationDuree = 0;
  this.selectedTypeVehicule = '';
  this.selectedPrestation = {
    _id: '',
    name: '',
    duree: 0,
    typeVehicule: ''
  };
}
 // Propriétés pour les données
 prestations: Prestation[] = [];
 typeVehicules: any[] = [];
 
 // Propriétés pour les modales
 ajoutPrestation = false;
 editPrestationDialog = false;
 displayConfirmation = false;
 
 // Données des formulaires
 prestationName = '';
 prestationDuree = 0;
 selectedTypeVehicule = '';
 
 selectedPrestation: Prestation = {
   _id: '',
   name: '',
   duree: 0,
   typeVehicule: ''
 };

 // États
 loading = false;
 loadingTypes = false;
 
 // Messages
 message = '';
 messageType: 'success' | 'error' | '' = '';
 showMessage = false;

 constructor(
   private prestationService: PrestationService,
   private typeVehiculeService: TypeVehiculeService,
   private authService: AuthService
 ) {}

 ngOnInit(): void {
   this.loadTypeVehicules();
   this.loadPrestations();
 }

 // Méthodes pour charger les données
 loadPrestations(): void {
   this.loading = true;
   this.prestationService.getAllPrestations().subscribe({
     next: (data) => {
       this.prestations = data;
       this.loading = false;
     },
     error: (err) => {
       this.showAlert('error', 'Erreur lors du chargement des prestations');
       this.loading = false;
     }
   });
 }

 loadTypeVehicules(): void {
   this.loadingTypes = true;
   this.typeVehiculeService.getTypeVehicules().subscribe({
     next: (response) => {
       this.typeVehicules = response;
       this.loadingTypes = false;
     },
     error: (err) => {
       this.showAlert('error', 'Erreur lors du chargement des types de véhicules');
       this.loadingTypes = false;
     }
   });
 }

 // Méthodes pour gérer les modales
 openAddPrestationDialog(): void {
   this.prestationName = '';
   this.prestationDuree = 0;
   this.selectedTypeVehicule = '';
   this.ajoutPrestation = true;
 }

 openEditPrestationDialog(prestation: Prestation): void {
   this.selectedPrestation = { ...prestation };
   this.editPrestationDialog = true;
 }

 openConfirmation(prestation: Prestation): void {
   this.selectedPrestation = { ...prestation };
   this.displayConfirmation = true;
 }

 hideDialog(): void {
   this.ajoutPrestation = false;
 }



// onCreatePrestation(): void {
//   this.loading = true;
  
//   const prestationData = {
//     name: this.prestationName,
//     duree: this.prestationDuree,
//     typeVehicule: this.selectedTypeVehicule
//   };

//   this.prestationService.createPrestation(prestationData).subscribe({
//     next: () => {
//       this.showAlert('success', 'Prestation créée avec succès');
//       this.loadPrestations();
//       this.ajoutPrestation = false;
//     },
//     error: (err) => {
//       this.showAlert('error', err.error?.message || 'Erreur lors de la création');
//       this.loading = false;
//     }
//   });
// }

onCreatePrestation(): void {
  // Récupérer l'ID de l'utilisateur connecté
  const userId = this.authService.getUserId();
  
  if (!userId) {
    this.showAlert('error', 'Utilisateur non identifié. Veuillez vous reconnecter.');
    return;
  }

  // Validation des données
  if (!this.prestationName || !this.prestationDuree || !this.selectedTypeVehicule) {
    this.showAlert('error', 'Veuillez remplir tous les champs');
    return;
  }

  this.loading = true;
  
  const prestationData = {
    name: this.prestationName,
    duree: this.prestationDuree,
    typeVehicule: this.selectedTypeVehicule,
    user: userId // Ajout de l'utilisateur créateur
  };

  this.prestationService.createPrestation(prestationData).subscribe({
    next: () => {
      this.showAlert('success', 'Prestation créée avec succès');
      this.loadPrestations();
      this.ajoutPrestation = false;
      this.resetForm();
    },
    error: (err) => {
      const errorMessage = err.error?.message || err.message || 'Erreur lors de la création';
      this.showAlert('error', errorMessage);
      this.loading = false;
    }
  });
}

onUpdatePrestation(): void {
  if (!this.selectedPrestation._id) return;

  this.loading = true;
  
  const prestationData = {
    name: this.selectedPrestation.name,
    duree: this.selectedPrestation.duree,
    typeVehicule: this.selectedPrestation.typeVehicule
  };

  this.prestationService.updatePrestation(this.selectedPrestation._id, prestationData).subscribe({
    next: () => {
      this.showAlert('success', 'Prestation modifiée avec succès');
      this.loadPrestations();
      this.editPrestationDialog = false;
    },
    error: (err) => {
      this.showAlert('error', err.error?.message || 'Erreur lors de la modification');
      this.loading = false;
    }
  });
}

 onDeletePrestation(): void {
   if (!this.selectedPrestation._id) return;
   
   this.loading = true;
   this.prestationService.deletePrestation(this.selectedPrestation._id).subscribe({
     next: () => {
       this.showAlert('success', 'Prestation supprimée avec succès');
       this.loadPrestations();
       this.displayConfirmation = false;
     },
     error: (err) => {
       this.showAlert('error', 'Erreur lors de la suppression');
       this.loading = false;
     }
   });
 }

 // Utilitaires
 getTypeVehiculeName(typeVehiculeId: string): string {
   if (!typeVehiculeId || !this.typeVehicules.length) return 'Chargement...';
   const type = this.typeVehicules.find(t => t._id === typeVehiculeId);
   return type ? type.name : 'Type inconnu';
 }

 private showAlert(type: 'success' | 'error', message: string): void {
   this.messageType = type;
   this.message = message;
   this.showMessage = true;
   
   setTimeout(() => {
     this.showMessage = false;
   }, 5000);
 }
}