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
import { PrestationService } from '../../../services/crud/prestation/prestation.service';
import { PresationmechanicienService } from '../../../services/presationmecanicien/presationmechanicien.service';

@Component({
  selector: 'app-listepresation',
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
  templateUrl: './listepresation.component.html',
  styleUrl: './listepresation.component.scss'
})
export class ListepresationComponent {
  prestations: any[] = [];
  selectedPrestationId: string = '';
  prestationsMecanicien: any[] = [];
  loading = false;

  constructor(private prestatioMecanicienService: PresationmechanicienService, private prestationService: PrestationService ) {}

  ngOnInit(): void {
    // Charger toutes les prestations au démarrage
    this.loading = true;
    this.prestationService.getAllPrestations().subscribe(
      (data) => {
        this.prestations = data; // Stocker les prestations récupérées
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des prestations:', error);
        this.loading = false;
      }
    );
  }

  // Méthode pour récupérer les prestations des mécaniciens associées à une prestation sélectionnée
  // onPrestationSelect(prestationId: string | number): void {
  //   if (!prestationId) {
  //     console.error("ID de prestation invalide");
  //     return;
  //   }
  
  //   this.loading = true;
  //   this.prestatioMecanicienService.getPrestationsByPrestationId(prestationId.toString()).subscribe(
  //     (data) => {
  //       this.prestationsMecanicien = data;
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des prestations des mécaniciens:', error);
  //       this.loading = false;
  //     }
  //   );
  // }
  
  onPrestationSelect(prestation: any): void {
    console.log('Données reçues:', prestation); // Inspectez la structure
    if (!prestation?._id) {
      console.error("Prestation invalide :", prestation);
      return;
    }
  
    this.loading = true;
    this.prestatioMecanicienService.getPrestationsByPrestationId(prestation._id)
      .subscribe({
        next: (data) => {
          this.prestationsMecanicien = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.loading = false;
        }
      });
  }
  
}
