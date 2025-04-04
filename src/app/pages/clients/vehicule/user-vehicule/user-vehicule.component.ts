import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { VehiculeuserService } from '../../../../services/vehicule/vehiculeuser.service';

@Component({
  selector: 'app-user-vehicule',
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
  templateUrl: './user-vehicule.component.html',
  styleUrl: './user-vehicule.component.scss'
})
export class UserVehiculeComponent implements OnInit{
  vehicules: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private vehiculeUserService: VehiculeuserService
  ) {}

  ngOnInit(): void {
    this.loadUserVehicules();
  }

  private loadUserVehicules(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessage = 'Utilisateur non identifié';
      this.isLoading = false;
      return;
    }

    this.vehiculeUserService.getVehiculesByUser(userId).subscribe(
      (response) => {
        this.vehicules = response;
        this.isLoading = false;
        console.log('Véhicules reçus :', response);
        this.vehicules = response;
        this.isLoading = false;
        console.log('Premier véhicule:', response[0]);
        console.log('Contenu du champ vehicule:', response[0].vehicule);

      },
      (error) => {
        this.errorMessage = error.error?.erreur || 'Erreur lors du chargement des véhicules';
        this.isLoading = false;
      }
    );
  }
}
