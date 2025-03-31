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

@Component({
  selector: 'app-listevehicule',
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
  templateUrl: './listevehicule.component.html',
  styleUrl: './listevehicule.component.scss'
})
export class ListevehiculeComponent {
  vehicules = [
    { matricule: '123-XYZ', annee: 2022, model: 'Toyota Corolla', energie: 'Essence' },
    { matricule: '456-ABC', annee: 2021, model: 'Honda Civic', energie: 'Diesel' },
    { matricule: '789-DEF', annee: 2023, model: 'Tesla Model 3', energie: 'Électrique' }
  ];

  voirDetails(matricule: string) {
    console.log(`Voir détails du véhicule : ${matricule}`);
  }

  modifierVehicule(matricule: string) {
    console.log(`Modifier le véhicule : ${matricule}`);
  }
}
