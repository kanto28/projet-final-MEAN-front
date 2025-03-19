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
  

  constructor(private energieService: EnergieService) { }

   // Creer une nouvelle energie
   onCreateEnergie() {
    this.energieService.createEnergie(this.energieName).subscribe(
      response => {
        console.log('Énergie créée avec succès', response);
      },
      error => {
        console.error('Erreur lors de la création de l\'énergie', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadEnergies(); 
  }
  
  loadEnergies(): void {
    this.energieService.getEnergies().subscribe(
      (data) => {
        this.energies = data;
        console.log('Énergies récupérées :', this.energies);  
      },
      (error) => {
        console.error('Erreur lors de la récupération des énergies', error);
      }
    );
  }
  

  ajoutEnergie: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  

  ovrirNouveauEnergie() {
    this.submitted = false;
    this.ajoutEnergie = true;
  }


  hideAjoutEnergie() {
    this.ajoutEnergie = false;
  }


// open update
openEditEnergieDialog(energie: any) {
  this.selectedEnergie = { ...energie }; 
  this.editEnergieDialog = true;
}

// close modal updaate
hideEditEnergieDialog() {
  this.editEnergieDialog = false;
  this.selectedEnergie = null;
}

// creer energie
onUpdateEnergie() {
  if (this.selectedEnergie) {
    this.energieService.updateEnergie(this.selectedEnergie._id, this.selectedEnergie.name).subscribe(
      response => {
        console.log('Énergie mise à jour avec succès', response);
        this.loadEnergies(); 
        this.hideEditEnergieDialog(); 
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'énergie', error);
      }
    );
  }
}



// modal supp
openConfirmation(energie: any) {
  this.energieToDelete = energie; 
  this.displayConfirmation = true; 
}

// close modal supp
closeConfirmation() {
  this.displayConfirmation = false;
  this.energieToDelete = null; 
}

//supprimer l'énergie
onDeleteEnergie() {
  if (this.energieToDelete) {
    this.energieService.deleteEnergie(this.energieToDelete._id).subscribe(
      response => {
        console.log('Énergie supprimée avec succès', response);
        this.loadEnergies(); 
        this.closeConfirmation();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'énergie', error);
      }
    );
  }
}

}
