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
import { VehiculeuserService } from '../../../services/vehicule/vehiculeuser.service';
import { Router } from '@angular/router';
import { EnergieService } from '../../../services/crud/energie/energie.service';
import { ModelService } from '../../../services/crud/model/model.service';
import { MoteurService } from '../../../services/crud/moteur/moteur.service';
import { TransmissionService } from '../../../services/crud/transmission/transmission.service';

@Component({
  selector: 'app-ajoutvehiculeuser',
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
  templateUrl: './ajoutvehiculeuser.component.html',
  styleUrl: './ajoutvehiculeuser.component.scss'
})
export class AjoutvehiculeuserComponent {
  vehiculeData = {
    matricule: '',
    annees: '',
    model: '',
    energie: '',
    moteur: '',
    transmission: '',
    user: '', // L'ID de l'utilisateur connecté
  };

  models = []; // Liste des modèles
  energies = []; // Liste des énergies
  moteurs = []; // Liste des moteurs
  transmissions = []; // Liste des transmissions

  constructor(private vehiculeUserService: VehiculeuserService, 
    private router: Router, 
    private modelService: ModelService,
    private energieService: EnergieService,
    private moteurService: MoteurService,
    private transmissionService: TransmissionService) {}

  ngOnInit() {
    // Charger les listes de modèles, énergies, moteurs, et transmissions
    this.loadModels();
    this.loadEnergies();
    this.loadMoteurs();
    this.loadTransmissions();

    // Récupérer l'utilisateur connecté
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.vehiculeData.user = userId;
    }
  }

  // Méthodes pour charger les données des services
  loadModels() {
    this.modelService.getModels().subscribe((data) => {
      this.models = data;
    });
  }

  loadEnergies() {
    this.energieService.getEnergies().subscribe((data) => {
      this.energies = data;
    });
  }

  loadMoteurs() {
    this.moteurService.getMoteurs().subscribe((data) => {
      this.moteurs = data;
    });
  }

  loadTransmissions() {
    this.transmissionService.getTransmissions().subscribe((data) => {
      this.transmissions = data;
    });
  }

  // Méthode pour envoyer le formulaire
  onSubmit() {
    this.vehiculeUserService.createVehicule(this.vehiculeData).subscribe(
      (response) => {
        console.log('Véhicule créé avec succès:', response);
        // Redirige ou affiche un message de succès
        this.router.navigate(['/success']); // Par exemple
      },
      (error) => {
        console.error('Erreur lors de la création du véhicule:', error);
        // Affiche un message d'erreur si nécessaire
      }
    );
  }

  //commit
}
