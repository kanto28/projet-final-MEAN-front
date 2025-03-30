import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
import { PieceService } from '../../../services/pieces/piece.service';
import { ModelService } from '../../../services/crud/model/model.service';
import { PrestationService } from '../../../services/crud/prestation/prestation.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-piece',
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
  templateUrl: './add-piece.component.html',
  styleUrl: './add-piece.component.scss',
  providers: [MessageService]
})
export class AddPieceComponent implements OnInit{
  pieceForm: FormGroup;
  models: any[] = [];
  prestations: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private pieceService: PieceService,
    private modelService: ModelService, // À injecter
    private prestationService: PrestationService, // À injecter
    private messageService: MessageService,
    private router: Router
  ) {
    this.pieceForm = this.fb.group({
      nom: ['', Validators.required],
      annees: ['', [Validators.required, Validators.maxLength(4)]],
      model: ['', Validators.required],
      prix: ['', Validators.required],
      prestationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadModels();
    this.loadPrestations();
  }

 
  loadModels(): void {
    this.modelService.getModels().subscribe({
      next: (data) => {
        console.log('Models data:', data); // Debug
        this.models = data;
      },
      error: (err) => {
        console.error('Error loading models:', err); // Debug
        this.handleError('Impossible de charger les modèles');
      }
    });
  }
  
  loadPrestations(): void {
    this.prestationService.getAllPrestations().subscribe({
      next: (data) => {
        console.log('Prestations data:', data); // Debug
        this.prestations = data;
      },
      error: (err) => {
        console.error('Error loading prestations:', err); // Debug
        this.handleError('Impossible de charger les prestations');
      }
    });
  }

 
  // add-piece.component.ts
// onSubmit(): void {
//   this.pieceService.addPiece(this.pieceForm.value).subscribe({
//     error: (err) => {
//       console.error('Submission error:', err);
      
//       let errorMessage = 'Erreur serveur';
//       if (err.status === 500 && err.error?.message) {
//         errorMessage = err.error.message;
//       }

//       this.messageService.add({
//         severity: 'error',
//         summary: 'Erreur',
//         detail: errorMessage,
//         life: 10000 // Affiche plus longtemps
//       });
//     }
//   });
// }

// Dans add-piece.component.ts
// onSubmit(): void {
//   if (this.pieceForm.invalid) {
//     this.pieceForm.markAllAsTouched();
//     return;
//   }

//   this.loading = true;
//   const formData = this.pieceForm.value;

//   this.pieceService.addPiece(formData).subscribe({
//     next: (response) => {
//       this.messageService.add({
//         severity: 'success',
//         summary: 'Succès',
//         detail: 'Pièce ajoutée avec succès'
//       });
//       this.router.navigate(['/pieces/stock']);
//     },
//     error: (err) => {
//       this.loading = false;
//       console.error('Full error:', err);
      
//       let errorDetail = 'Erreur lors de l\'ajout de la pièce';
//       if (err.status === 404) {
//         errorDetail = 'Endpoint API non trouvé - Contactez l\'administrateur';
//       } else if (err.error?.message) {
//         errorDetail = err.error.message;
//       }

//       this.messageService.add({
//         severity: 'error',
//         summary: 'Erreur',
//         detail: errorDetail,
//         life: 10000
//       });
//     }
//   });
// }

onSubmit(): void {
  this.loading = true;
  
  this.pieceService.addPiece(this.pieceForm.value).subscribe({
    next: (response) => {
      console.log('Réponse complète:', response);
      // Gestion du succès...
    },
    error: (error) => {
      this.loading = false;
      console.error('Erreur détaillée:', error);

      let errorMessage = 'Erreur serveur';
      if (error.error?.erreur) {
        errorMessage = error.error.erreur;
        if (error.error.details) {
          errorMessage += ` (${error.error.details})`;
        }
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: errorMessage,
        life: 10000
      });
    }
  });
}

  private handleError(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail
    });
    this.loading = false;
  }


  onCancel(): void {
    this.router.navigate(['/pieces/stock']);
  }
}
