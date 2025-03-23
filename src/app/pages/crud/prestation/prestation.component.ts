import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importez Router pour la redirection
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
import { Prestation } from '../../../models/prestation.model';
import { PrestationService } from '../../../services/prestation/prestation.service';
import { TypeVehiculeService } from '../../../services/crud/typeVehicule/type-vehicule.service';

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
    ConfirmDialogModule
  ],
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.scss'
})
export class PrestationComponent  {
  // name: string = '';
  // duree: number = 0;
  // typeVehicule: string = '';  // Variable liée à l'option sélectionnée
  // isSubmitting: boolean = false;
  // typeVehicules: any[] = []; // Tableau pour stocker les types de véhicules récupérés

  // constructor(
  //   private prestationService: PrestationService,
  //   private typeVehiculeService: TypeVehiculeService // Injection du service TypeVehiculeService
  // ) {}

  // ngOnInit() {
  //   this.getTypeVehicules(); // Appeler la méthode pour récupérer les types de véhicules au démarrage
  // }

  // // Méthode pour récupérer les types de véhicules
  // getTypeVehicules() {
  //   this.typeVehiculeService.getTypeVehicules().subscribe(
  //     (response) => {
  //       this.typeVehicules = response; // Stocker les types de véhicules dans le tableau
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des types de véhicules:', error);
  //     }
  //   );
  // }

  // // Méthode de soumission du formulaire
  // onSubmit() {
  //   if (this.name && this.duree && this.typeVehicule) {
  //     this.isSubmitting = true;
  //     const prestationData = { name: this.name, duree: this.duree, typeVehicule: this.typeVehicule };

  //     this.prestationService.createPrestation(prestationData).subscribe(
  //       (response) => {
  //         console.log('Prestation créée avec succès:', response);
  //         this.isSubmitting = false;
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la création de la prestation:', error);
  //         this.isSubmitting = false;
  //       }
  //     );
  //   } else {
  //     console.error('Tous les champs doivent être remplis');
  //   }
  // }
  
  
}
