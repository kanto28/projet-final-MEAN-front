import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-transmission',
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
    ConfirmDialogModule
  ],
  templateUrl: './transmission.component.html',
  styleUrl: './transmission.component.scss'
})
export class TransmissionComponent {
  ajoutTransmission: boolean = false;
  editTransmission: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  

  products = [
    { id: '01', name: 'Toyota', price: 20000, category: 'SUV', reviews: 4, status: 'Available' },
    { id: '02', name: 'Ford', price: 25000, category: 'Truck', reviews: 5, status: 'Sold Out' },
    { id: '03', name: 'BMW', price: 30000, category: 'Sedan', reviews: 4.5, status: 'Available' }
  ];

  ovrirNouveauTransmission() {
    this.submitted = false;
    this.ajoutTransmission = true;
  }

  hideDialog() {
    this.ajoutTransmission = false;
    this.submitted = false;
  }

  ovrirEditTransmission() {
    this.submitted = false;
    this.editTransmission = true;
  }

  hideEditTransmission() {
    this.editTransmission = false;
    this.submitted = false;
  }

  openConfirmation() {
    this.displayConfirmation = true;
}

closeConfirmation() {
  this.displayConfirmation = false;
}
}
