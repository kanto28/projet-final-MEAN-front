import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { VehiculeService } from '../../../services/vehicule/vehicule.service';
import { EnergieService } from '../../../services/crud/energie/energie.service';
import { ModelService } from '../../../services/crud/model/model.service';
import { MoteurService } from '../../../services/crud/moteur/moteur.service';
import { TransmissionService } from '../../../services/crud/transmission/transmission.service';

@Component({
  selector: 'app-modifvehicule',
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
        ReactiveFormsModule,
        SelectModule
  ],
  templateUrl: './modifvehicule.component.html',
  styleUrl: './modifvehicule.component.scss'
})
export class ModifvehiculeComponent {
  matricule: string = '';
  vehicule: any = null; // Objet véhicule récupéré depuis le backend

  // Tableaux pour alimenter les <select>
  models: any[] = [];
  energies: any[] = [];
  moteurs: any[] = [];
  transmissions: any[] = [];

  errorMessage: string = '';
  successMessage: string = '';
  
  // Ici, pour l'exemple, on fixe un token. En production, récupère-le depuis ton système d'authentification.
  token: string = 'TON_TOKEN_ICI';

  constructor(
    private vehiculeService: VehiculeService,
    private modelService: ModelService,
    private energieService: EnergieService,
    private moteurService: MoteurService,
    private transmissionService: TransmissionService
  ) {}

  ngOnInit() {
    // Charger les listes d'options pour les sélections
    this.loadModels();
    this.loadEnergies();
    this.loadMoteurs();
    this.loadTransmissions();
  }

  loadModels() {
    this.modelService.getModels().subscribe({
      next: (data: any[]) => this.models = data,
      error: (err) => console.error("Erreur lors du chargement des modèles", err)
    });
  }

  loadEnergies() {
    this.energieService.getEnergies().subscribe({
      next: (data: any[]) => this.energies = data,
      error: (err) => console.error("Erreur lors du chargement des énergies", err)
    });
  }

  loadMoteurs() {
    this.moteurService.getMoteurs().subscribe({
      next: (data: any[]) => this.moteurs = data,
      error: (err) => console.error("Erreur lors du chargement des moteurs", err)
    });
  }

  loadTransmissions() {
    this.transmissionService.getTransmissions().subscribe({
      next: (data: any[]) => this.transmissions = data,
      error: (err) => console.error("Erreur lors du chargement des transmissions", err)
    });
  }

  // Recherche d'un véhicule par matricule (GET)
  searchVehicule() {
    if (!this.matricule) {
      this.errorMessage = "Veuillez entrer un matricule.";
      return;
    }
    this.vehiculeService.getVehiculeByMatricule(this.matricule, this.token).subscribe({
      next: (data) => {
        this.vehicule = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.vehicule = null;
        this.errorMessage = err.error.erreur || "Erreur lors de la récupération du véhicule.";
      }
    });
  }

  // Mise à jour du véhicule (PUT)
  updateVehicule() {
    if (!this.vehicule) return;

    // On suppose ici que les <select> font renvoyer des ID (string) pour chaque référence.
    this.vehiculeService.updateVehicule(this.matricule, this.vehicule, this.token).subscribe({
      next: (data) => {
        this.successMessage = data.message;
        this.errorMessage = '';
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error.erreur || "Erreur lors de la mise à jour du véhicule.";
      }
    });
  }
}
