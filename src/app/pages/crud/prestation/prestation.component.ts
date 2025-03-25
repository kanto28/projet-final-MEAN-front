import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class PrestationComponent {
  prestation = {
    name: '',
    duree: 0,
    typeVehicule: ''
  };
  prestations: Prestation[] = [];

  // Liste des types de véhicules
  typeVehicules: any[] = [];
  isLoading = false;
  loadingTypes = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private prestationService: PrestationService,
    private typeVehiculeService: TypeVehiculeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTypeVehicules();
    this.loadPrestations();
  }

  loadPrestations(): void {
    this.prestationService.getAllPrestations().subscribe({
      next: (data) => {
        this.prestations = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des prestations';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // Charger les types de véhicules
  loadTypeVehicules() {
    this.loadingTypes = true;
    this.typeVehiculeService.getTypeVehicules().subscribe({
      next: (response) => {
        this.typeVehicules = response;
        this.loadingTypes = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des types de véhicules';
        this.loadingTypes = false;
      }
    });
  }

  // onSubmit() {
  //   this.isLoading = true;
  //   this.successMessage = null;
  //   this.errorMessage = null;

  //   this.prestationService.createPrestation(this.prestation).subscribe({
  //     next: (response) => {
  //       this.isLoading = false;
  //       this.successMessage = 'Prestation créée avec succès';
  //       setTimeout(() => {
  //         this.router.navigate(['/prestations']);
  //       }, 1500);
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       this.errorMessage = err.error.erreur || 'Erreur lors de la création';
  //     }
  //   });
  // }
  // prestation.component.ts
// prestation.component.ts
onSubmit() {
  console.log('Données du formulaire:', this.prestation); // Vérifiez les données avant envoi
  
  this.isLoading = true;
  this.prestationService.createPrestation(this.prestation).subscribe({
    next: (response) => {
      console.log('Réponse serveur:', response);
      // Gestion succès...
    },
    error: (err) => {
      console.error('Erreur complète:', err);
      if (err.error) {
        console.error('Détails erreur serveur:', err.error);
        this.errorMessage = err.error.message || err.error.erreur || 'Erreur serveur';
      } else {
        this.errorMessage = 'Erreur de connexion au serveur';
      }
      this.isLoading = false;
    }
  });
}

  clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }
}
