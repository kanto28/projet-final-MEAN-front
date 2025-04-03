import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { VehiculeService } from '../../../../services/vehicule/vehicule.service';
import { EnergieService } from '../../../../services/crud/energie/energie.service';
import { ModelService } from '../../../../services/crud/model/model.service';
import { MoteurService } from '../../../../services/crud/moteur/moteur.service';
import { TransmissionService } from '../../../../services/crud/transmission/transmission.service';
import { VehiculeuserService } from '../../../../services/vehicule/vehiculeuser.service';

@Component({
  selector: 'app-user-vehicule-ajout',
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
        ProgressBarModule 
  ],
  templateUrl: './user-vehicule-ajout.component.html',
  styleUrl: './user-vehicule-ajout.component.scss'
})
export class UserVehiculeAjoutComponent implements OnInit {
 // Supprimez les déclarations individuelles (matricule, model, etc.)
 vehiculeData: any = {
  matricule: '',
  annees: '',
  model: '',
  energie: '',
  moteur: '',
  transmission: '',
  user: ''
};

models: any[] = [];
energies: any[] = [];
moteurs: any[] = [];
transmissions: any[] = [];

constructor(
  private vehiculeUserService: VehiculeuserService,
  private modelService: ModelService,
  private energieService: EnergieService,
  private moteurService: MoteurService,
  private transmissionService: TransmissionService,
  private router: Router
) {}

ngOnInit(): void {
  this.loadModels();
  this.loadEnergies();
  this.loadMoteurs();
  this.loadTransmissions();
  this.loadUser();
}

private loadModels(): void {
  this.modelService.getModels().subscribe(
    (models) => {
      console.log('Models loaded:', models); // Debug
      this.models = models;
    },
    (error) => {
      console.error('Error loading models:', error);
    }
  );
}

private loadEnergies(): void {
  this.energieService.getEnergies().subscribe(
    (energies) => {
      this.energies = energies;
    },
    (error) => {
      console.error('Error loading energies:', error);
    }
  );
}

private loadMoteurs(): void {
  this.moteurService.getMoteurs().subscribe(
    (moteurs) => {
      this.moteurs = moteurs;
    },
    (error) => {
      console.error('Error loading moteurs:', error);
    }
  );
}

private loadTransmissions(): void {
  this.transmissionService.getTransmissions().subscribe(
    (transmissions) => {
      this.transmissions = transmissions;
    },
    (error) => {
      console.error('Error loading transmissions:', error);
    }
  );
}

private loadUser(): void {
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.vehiculeData.user = userId;
  }
}

onSubmit(): void {
  console.log('Form data submitted:', this.vehiculeData); // Debug
  this.vehiculeUserService.createVehicule(this.vehiculeData).subscribe(
    (response) => {
      console.log('Vehicle created successfully:', response);
      this.router.navigate(['/clients/vehicule/userVehicule']);
    },
    (error) => {
      console.error('Error creating vehicle:', error);
      // Ajoutez ici un message d'erreur utilisateur si nécessaire
    }
  );
}
  
}
