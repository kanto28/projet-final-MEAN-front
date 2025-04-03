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
  selector: 'app-ajoutvehicule',
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
  templateUrl: './ajoutvehicule.component.html',
  styleUrl: './ajoutvehicule.component.scss'
})
export class AjoutvehiculeComponent {
  matricule: string = '';
  annees: string = '';
  model: string = '';
  energie: string = '';
  moteur: string = '';
  transmission: string = '';

  models: any[] = [];
  energies: any[] = [];
  moteurs: any[] = [];
  transmissions: any[] = [];

  constructor(
    private vehiculeService: VehiculeService,
    private modelService: ModelService,
    private energieService: EnergieService,
    private moteurService: MoteurService,
    private transmissionService: TransmissionService
  ) {}

  // Chargement des options au démarrage du composant
  ngOnInit() {
    this.modelService.getModels().subscribe(models => {
      this.models = models;
    });

    this.energieService.getEnergies().subscribe(energies => {
      this.energies = energies;
    });

    this.moteurService.getMoteurs().subscribe(moteurs => {
      this.moteurs = moteurs;
    });

    this.transmissionService.getTransmissions().subscribe(transmissions => {
      this.transmissions = transmissions;
    });
  }

  // Fonction pour soumettre le formulaire
  onSubmit() {
    this.vehiculeService.createVehicule(this.matricule, this.annees, this.model, this.energie, this.moteur, this.transmission)
      .subscribe({
        next: (response) => {
          console.log('Véhicule créé avec succès', response);
          // Rediriger ou afficher un message de succès
        },
        error: (error) => {
          console.error('Erreur lors de la création du véhicule', error);
          // Afficher un message d'erreur
        }
      });
  }
}
