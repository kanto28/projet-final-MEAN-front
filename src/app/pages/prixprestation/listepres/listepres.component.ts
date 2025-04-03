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
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PrxprestationService } from '../../../services/prixprestaion/prxprestation.service';
import { Prestation } from '../../../models/prestation.model';

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
export class ListepresComponent implements OnInit{
  prestations: Prestation[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private prixprestationService: PrxprestationService) {}

  ngOnInit(): void {
    this.loadPrestations();
  }

  loadPrestations(): void {
    this.prixprestationService.getAllPrestations().subscribe({
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
}
