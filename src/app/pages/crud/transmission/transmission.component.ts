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
    ConfirmDialogModule
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

  constructor(private transmissionService: TransmissionService) { }

   // Creer une nouvelle Transmission
   onCreateTransmission() {
    this.transmissionService.createTransmission(this.transmissionName).subscribe(
      response => {
        console.log('Transmission  créée avec succès', response);
      },
      error => {
        console.error('Erreur lors de la création du Transmission', error);
      }
    );
  }

  
  ngOnInit(): void {
    this.loadTransmission(); 
  }

  loadTransmission(): void {
    this.transmissionService.getTransmissions().subscribe(
      (data) => {
        this.transmissions = data;
        console.log('Transmission récupérées :', this.transmissions);  
      },
      (error) => {
        console.error('Erreur lors de la récupération des Transmission', error);
      }
    );
  }

  ajoutTransmission: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;

  ovrirNouveauTransmission() {
    this.submitted = false;
    this.ajoutTransmission = true;
  }


  hideAjoutTransmission() {
    this.ajoutTransmission = false;
  }

  // open update
  openEditTransmissionDialog(transmission: any) {
    this.selectedTransmission = { ...transmission }; 
    this.editTransmissionDialog = true;
  }
  
  // close modal updaate
  hideEditTransmissionDialog() {
    this.editTransmissionDialog = false;
    this.selectedTransmission = null;
  }
  
  // modifier trabnsmission
  onUpdateTransmission() {
    if (this.selectedTransmission) {
      this.transmissionService.updateTransmission(this.selectedTransmission._id, this.selectedTransmission.name).subscribe(
        response => {
          console.log('Transmission mise à jour avec succès', response);
          this.loadTransmission(); 
          this.hideAjoutTransmission(); 
        },
        error => {
          console.error('Erreur lors de la mise à jour du transmission', error);
        }
      );
    }
  }

  // modal supp
  openConfirmation(transmission: any) {
    this.transmissionToDelete = transmission; 
    this.displayConfirmation = true; 
  }
  
  // close modal supp
  closeConfirmation() {
    this.displayConfirmation = false;
    this.transmissionToDelete = null; 
  }

  //supprimer l'Transmission
  onDeleteTransmission() {
    if (this.transmissionToDelete) {
      this.transmissionService.deleteTransmission(this.transmissionToDelete._id).subscribe(
        response => {
          console.log('transmission supprimée avec succès', response);
          this.loadTransmission(); 
          this.closeConfirmation();
        },
        error => {
          console.error('Erreur lors de la suppression de la Transmission', error);
        }
      );
    }
  }

}
