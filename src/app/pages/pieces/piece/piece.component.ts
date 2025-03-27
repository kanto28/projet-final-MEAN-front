import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ModelService } from '../../../services/crud/model/model.service';
import { PrestationService } from '../../../services/crud/prestation/prestation.service';
import { PieceService } from '../../../services/pieces/piece.service';

@Component({
  selector: 'app-piece',
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
        ReactiveFormsModule
  ],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceComponent {
  pieceForm: FormGroup;
  models: any[] = [];
  prestations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private pieceService: PieceService,
    private modelService: ModelService,
    private prestationService: PrestationService
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

  // loadModels(): void {
  //   this.modelService.getModels().subscribe(
  //     data => this.models = data,
  //     error => console.error('Error loading models', error)
  //   );
  // }

 loadModels() {
  this.modelService.getModels().subscribe({
    next: (data) => {
      console.log('Données reçues:', data); // Vérifiez la structure
      this.models = data || []; // Garantit un tableau même si null
    },
    error: (err) => console.error('Erreur chargement modèles', err)
  });
}
  loadPrestations(): void {
    this.prestationService.getAllPrestations().subscribe({
      next: (data) => {
        this.prestations = data;
        console.log('Prestations loaded:', this.prestations); // Vérifiez dans la console
      },
      error: (err) => console.error('Error loading prestations', err)
    });
  }

  // loadPrestations(): void {
  //   this.prestationService.getAllPrestations().subscribe(
  //     data => this.prestations = data,
  //     error => console.error('Error loading prestations', error)
  //   );
  // }

  // onSubmit(): void {
  //   if (this.pieceForm.valid) {
  //     const pieceData = this.pieceForm.value;
  //     this.pieceService.addPiece(pieceData).subscribe(
  //       response => {
  //         console.log('Pièce ajoutée avec succès', response);
  //         // Réinitialiser le formulaire ou rediriger
  //         this.pieceForm.reset();
  //       },
  //       error => console.error('Erreur lors de l\'ajout de la pièce', error)
  //     );
  //   }
  // }

  onSubmit(): void {
    // Vérifie si le formulaire est valide
    if (this.pieceForm.valid) {
      const pieceData = this.pieceForm.value;
      
      this.pieceService.addPiece(pieceData).subscribe({
        next: (response: any) => {
          console.log('Pièce ajoutée avec succès', response);
          alert('Pièce ajoutée avec succès!'); // Notification simple
          this.pieceForm.reset(); // Réinitialise le formulaire
          
          // Option: Recharger les données si nécessaire
          // this.loadPieces(); 
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'ajout', error);
          
          // Gestion d'erreur basique
          if (error.status === 0) {
            alert('Erreur de connexion - Vérifiez votre réseau');
          } else if (error.status === 400) {
            alert('Données invalides: ' + (error.error.message || ''));
          } else if (error.status === 401 || error.status === 403) {
            alert('Accès non autorisé');
          } else {
            alert('Erreur serveur: ' + (error.message || 'Veuillez réessayer'));
          }
        }
      });
    } else {
      // Affiche une alerte si le formulaire est invalide
      alert('Veuillez remplir tous les champs requis correctement');
      
      // Marque les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.pieceForm);
    }
  }
  
  // Méthode utilitaire pour marquer tous les champs comme "touched"
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
