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
    ConfirmDialogModule
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

  constructor(private typeVehiculeService: TypeVehiculeService) { }

   // Creer une nouvelle Type de Vehicule
   onCreateTypeVehicule() {
    this.typeVehiculeService.createMoteur(this.typeVehiculeName).subscribe(
      response => {
        console.log('Type de Vehicule  créée avec succès', response);
      },
      error => {
        console.error('Erreur lors de la création du Type de Vehicule', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadTypeVehicule(); 
  }
  
  loadTypeVehicule(): void {
    this.typeVehiculeService.getTypeVehicules().subscribe(
      (data) => {
        this.typeVehicules = data;
        console.log('Type de Vehicule récupérées :', this.typeVehicules);  
      },
      (error) => {
        console.error('Erreur lors de la récupération des type de vehicule', error);
      }
    );
  }

    ajoutTypeVehicule: boolean = false;
    submitted: boolean = false;
    displayConfirmation: boolean = false;

    ovrirNouveauTypeVehicule() {
      this.submitted = false;
      this.ajoutTypeVehicule = true;
    }
  
  
    hideAjoutTypeVehicule() {
      this.ajoutTypeVehicule = false;
    }

    // open update
  openEditTypeVehiculeDialog(typeVehicule: any) {
    this.selectedTypeVehicule = { ...typeVehicule }; 
    this.editTypeVehiculeDialog = true;
  }
  
  // close modal updaate
  hideEditTypeVehiculeDialog() {
    this.editTypeVehiculeDialog = false;
    this.selectedTypeVehicule = null;
  }

  // creer type de vehicule
  onUpdateTypeVehicule() {
    if (this.selectedTypeVehicule) {
      this.typeVehiculeService.updateTypeVehicule(this.selectedTypeVehicule._id, this.selectedTypeVehicule.name).subscribe(
        response => {
          console.log('Type de Vehicule mise à jour avec succès', response);
          this.loadTypeVehicule(); 
          this.hideEditTypeVehiculeDialog(); 
        },
        error => {
          console.error('Erreur lors de la mise à jour du type de vehicule', error);
        }
      );
    }
  }

  // modal supp
  openConfirmation(typeVehicule: any) {
    this.typeVehiculeToDelete = typeVehicule; 
    this.displayConfirmation = true; 
  }
  
  // close modal supp
  closeConfirmation() {
    this.displayConfirmation = false;
    this.typeVehiculeToDelete = null; 
  }

  //supprimer l'Type de vehicule
  onDeleteTypeVehicule() {
    if (this.typeVehiculeToDelete) {
      this.typeVehiculeService.deleteTypeVehicule(this.typeVehiculeToDelete._id).subscribe(
        response => {
          console.log('type de vehicule supprimée avec succès', response);
          this.loadTypeVehicule(); 
          this.closeConfirmation();
        },
        error => {
          console.error('Erreur lors de la suppression du type de vehicule', error);
        }
      );
    }
  }

}

