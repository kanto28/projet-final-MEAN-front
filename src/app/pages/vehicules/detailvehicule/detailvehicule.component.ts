import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-detailvehicule',
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
  templateUrl: './detailvehicule.component.html',
  styleUrl: './detailvehicule.component.scss'
})
export class DetailvehiculeComponent {
  matricule: string = '';
  vehicule: any = null;
  errorMessage: string = '';
  token: string = 'TON_TOKEN_ICI'; // Remplace par ton vrai token (à récupérer dynamiquement)

  constructor(private vehiculeService: VehiculeService) {}

  chercherVehicule() {
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
}
