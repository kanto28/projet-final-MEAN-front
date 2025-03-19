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
import { MarqueService } from '../../../services/crud/marque/marque.service';

@Component({
  selector: 'app-marque',
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
  templateUrl: './marque.component.html',
  styleUrl: './marque.component.scss'
})
export class MarqueComponent implements OnInit{

  marqueName: string = '';
  marques: any[] = [];
  selectedMarque: any = null; 
  editMarqueDialog: boolean = false; 
  marqueToDelete: any = null;

  constructor(private marqueService: MarqueService) { }

   // Creer une nouvelle Marque
   onCreateMarque() {
    this.marqueService.createMarque(this.marqueName).subscribe(
      response => {
        this.marques.push(response);
        this.marqueName = '';
      },
      error => {
        console.error(error);
      }
    );
  }

  // Récupérer toutes les Marques
  getMarques() {
    this.marqueService.getMarques().subscribe(
      response => {
        this.marques = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  // Mettre à jour une Marque existante
  onUpdateMarque() {
    this.marqueService.updateMarque(this.selectedMarque._id, this.selectedMarque.name).subscribe(
      response => {
        const index = this.marques.findIndex(marque => marque._id === this.selectedMarque._id);
        this.marques[index] = response;
        this.editMarqueDialog = false;
      },
      error => {
        console.error(error);
      }
    );
  }

  // Supprimer une Marque existante
  onDeleteMarque() {
    this.marqueService.deleteMarque(this.marqueToDelete._id).subscribe(
      response => {
        this.marques = this.marques.filter(marque => marque._id !== this.marqueToDelete._id);
        this.marqueToDelete = null;
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
    this.loadMarque(); 
  }

  loadMarque(): void {
    this.marqueService.getMarques().subscribe(
      (data) => {
        this.marques = data;
        console.log('Marque récupérées :', this.marques);  
      },
      (error) => {
        console.error('Erreur lors de la récupération des Marques', error);
      }
    );
  }

  ajoutMarque: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;

  ovrirNouveauMarque() {
    this.submitted = false;
    this.ajoutMarque = true;
  }


  hideAjoutMarque() {
    this.ajoutMarque = false;
  }

  // open update
  openEditMarqueDialog(marque: any) {
    this.selectedMarque = { ...marque }; 
    this.editMarqueDialog = true;
  }

  // close modal updaate
  hideEditMarqueDialog() {
    this.editMarqueDialog = false;
    this.selectedMarque = null;
  }

  // modal supp
  openConfirmation(marque: any) {
    this.marqueToDelete = marque; 
    this.displayConfirmation = true; 
  }
  
  // close modal supp
  closeConfirmation() {
    this.displayConfirmation = false;
    this.marqueToDelete = null; 
  }
}
