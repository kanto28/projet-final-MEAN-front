import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RendezvousService } from '../../../../services/rendezvous/rendezvous.service';
import { CommonModule } from '@angular/common';
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
import { PrestationService } from '../../../../services/crud/prestation/prestation.service';

@Component({
  selector: 'app-devis',
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
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.scss'
})
export class DevisComponent implements OnInit {
  devisForm: FormGroup;
  prestations: any[] = [];
  isLoading = false;
  errorMessage = '';
  devisResult: any;

  constructor(
    private fb: FormBuilder,
    private devisService: RendezvousService,
    private prestationService: PrestationService
  ) {
    this.devisForm = this.fb.group({
      details: this.fb.array([this.createDetail()])
    });
  }

  ngOnInit(): void {
    this.loadPrestations();
  }

  loadPrestations(): void {
    this.isLoading = true;
    this.prestationService.getPrestations().subscribe({
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

  createDetail(): FormGroup {
    return this.fb.group({
      prestation: [{ value: '', disabled: this.isLoading }]
    });
  }

  get details(): FormArray {
    return this.devisForm.get('details') as FormArray;
  }

  addDetail(): void {
    this.details.push(this.createDetail());
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  onSubmit(): void {
    if (this.devisForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const formValue = this.devisForm.value;
      // Filtrer les détails vides
      const validDetails = formValue.details.filter((d: any) => d.prestation !== '');
      
      if (validDetails.length === 0) {
        this.errorMessage = 'Veuillez sélectionner au moins une prestation';
        this.isLoading = false;
        return;
      }

      this.devisService.getDevis(validDetails).subscribe({
        next: (response) => {
          this.devisResult = response;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du calcul du devis';
          this.isLoading = false;
          console.error(err);
        }
      });
      this.isLoading = true;
      this.updateControlsState();
    }
  }

  // devis.component.ts
isPrestationSelected(prestationId: string, currentIndex: number): boolean {
  // Vérifie si la prestation est déjà sélectionnée dans un autre détail
  return this.devisForm.value.details.some(
    (detail: any, index: number) => 
      detail.prestation === prestationId && index !== currentIndex
  );
}

getPrestationName(prestationId: string): string {
  const prestation = this.prestations.find(p => p._id === prestationId);
  return prestation ? prestation.nom : 'Prestation inconnue';
}

updateControlsState(): void {
  const shouldDisable = this.isLoading;
  this.details.controls.forEach(control => {
    if (shouldDisable) {
      control.get('prestation')?.disable();
    } else {
      control.get('prestation')?.enable();
    }
  });
}
}
