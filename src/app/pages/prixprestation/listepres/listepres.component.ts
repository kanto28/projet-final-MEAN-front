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

@Component({
  selector: 'app-listepres',
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
  templateUrl: './listepres.component.html',
  styleUrl: './listepres.component.scss'
})
export class ListepresComponent {
  prestationsWithPrices: any[] = [
    {
      prestation: { name: 'Vidange', duree: 30, typeVehicule: { name: 'Voiture' }, status: true },
      dernierPrix: { prix: 50, dates: '01/03/2025' }
    },
    {
      prestation: { name: 'Changement de pneus', duree: 45, typeVehicule: { name: 'Camion' }, status: false },
      dernierPrix: { prix: 80, dates: '15/02/2025' }
    },
    {
      prestation: { name: 'Révision complète', duree: 120, typeVehicule: { name: 'Voiture' }, status: true },
      dernierPrix: { prix: 200, dates: '10/01/2025' }
    },
    {
      prestation: { name: 'Contrôle technique', duree: 60, typeVehicule: { name: 'Moto' }, status: true },
      dernierPrix: { prix: 30, dates: '20/03/2025' }
    },
    {
      prestation: { name: 'Réparation moteur', duree: 180, typeVehicule: { name: 'Camion' }, status: false },
      dernierPrix: { prix: 500, dates: '25/04/2025' }
    }
  ];

  prestationsPaginated: any[] = [];
  totalRecords: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.totalRecords = this.prestationsWithPrices.length;
    this.prestationsPaginated = this.prestationsWithPrices.slice(0, 5);
  }

  onPageChange(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.prestationsPaginated = this.prestationsWithPrices.slice(start, end);
  }

  getStatusColor(status: boolean) {
    return status ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  }
}
