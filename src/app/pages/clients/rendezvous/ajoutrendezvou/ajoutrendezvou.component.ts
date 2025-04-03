import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { RendezvousService } from '../../../../services/rendezvous/rendezvous.service';
import { RendezVousResponse } from '../../../../models/rendezvous-response.model';

@Component({
  selector: 'app-ajoutrendezvou',
  imports: [CommonModule,
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
        SelectModule],
  templateUrl: './ajoutrendezvou.component.html',
  styleUrl: './ajoutrendezvou.component.scss'
})
export class AjoutrendezvouComponent {
  rendezVousForm: FormGroup;
  devis: RendezVousResponse['devis'] = []; // Typage explicite
  prixTotal: number = 0;
  showDevis = false;

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezvousService,
    private router: Router
  ) {
    this.rendezVousForm = this.fb.group({
      vehicule: ['', Validators.required],
      user: ['', Validators.required],
      Mvola: ['', Validators.required],
      details: this.fb.array([this.createDetail()])
    });
  }

  createDetail(): FormGroup {
    return this.fb.group({
      prestation: ['', Validators.required]
    });
  }

  get details(): FormArray {
    return this.rendezVousForm.get('details') as FormArray;
  }

  addDetail(): void {
    this.details.push(this.createDetail());
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  onSubmit(): void {
    if (this.rendezVousForm.valid) {
      this.rendezVousService.createRendezVous(this.rendezVousForm.value)
        .subscribe({
          next: (response: RendezVousResponse) => { // Typage de la réponse
            this.devis = response.devis;
            this.prixTotal = response.prixTotal;
            this.showDevis = true;
          },
          error: (error) => {
            console.error('Erreur lors de la création du rendez-vous', error);
          }
        });
    }
  }

  confirmRendezVous(): void {
    this.router.navigate(['/rendezvous/list']);
  }
}
