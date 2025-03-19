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
    ConfirmDialogModule
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
    
  
    constructor(private moteurService: MoteurService) { }
  
     // Creer une nouvelle moteur
     onCreateMoteur() {
      this.moteurService.createMoteur(this.moteurName).subscribe(
        response => {
          console.log('Moteur créée avec succès', response);
        },
        error => {
          console.error('Erreur lors de la création du moteur', error);
        }
      );
    }
  
    ngOnInit(): void {
      this.loadMoteur(); 
    }
    
    loadMoteur(): void {
      this.moteurService.getMoteurs().subscribe(
        (data) => {
          this.moteurs = data;
          console.log('Moteur récupérées :', this.moteurs);  
        },
        (error) => {
          console.error('Erreur lors de la récupération des moteurs', error);
        }
      );
    }
    
  
    ajoutMoteur: boolean = false;
    submitted: boolean = false;
    displayConfirmation: boolean = false;
    
  
    ovrirNouveauMoteur() {
      this.submitted = false;
      this.ajoutMoteur = true;
    }
  
  
    hideAjoutMoteur() {
      this.ajoutMoteur = false;
    }
  
  
  // open update
  openEditMoteurDialog(moteur: any) {
    this.selectedMoteur = { ...moteur }; 
    this.editMoteurDialog = true;
  }
  
  // close modal updaate
  hideEditMoteurDialog() {
    this.editMoteurDialog = false;
    this.selectedMoteur = null;
  }
  
  // creer moteur
  onUpdateMoteur() {
    if (this.selectedMoteur) {
      this.moteurService.updateMoteur(this.selectedMoteur._id, this.selectedMoteur.name).subscribe(
        response => {
          console.log('Moteur mise à jour avec succès', response);
          this.loadMoteur(); 
          this.hideEditMoteurDialog(); 
        },
        error => {
          console.error('Erreur lors de la mise à jour du moteur', error);
        }
      );
    }
  }
  
  
  
  // modal supp
  openConfirmation(moteur: any) {
    this.moteurToDelete = moteur; 
    this.displayConfirmation = true; 
  }
  
  // close modal supp
  closeConfirmation() {
    this.displayConfirmation = false;
    this.moteurToDelete = null; 
  }
  
  //supprimer l'énergie
  onDeleteMoteur() {
    if (this.moteurToDelete) {
      this.moteurService.deleteMoteur(this.moteurToDelete._id).subscribe(
        response => {
          console.log('Moteur supprimée avec succès', response);
          this.loadMoteur(); 
          this.closeConfirmation();
        },
        error => {
          console.error('Erreur lors de la suppression du moteur', error);
        }
      );
    }
  }
}
