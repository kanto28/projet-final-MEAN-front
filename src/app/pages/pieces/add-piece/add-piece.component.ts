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

  // Initialisation du formulaire
  constructor(private fb: FormBuilder, private pieceService: PieceService,  private modelService: ModelService,private prestationService: PrestationService) {
    this.pieceForm = this.fb.group({
      nom: ['', [Validators.required]],
      annees: ['', [Validators.required, Validators.maxLength(4)]],
      model: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      prestationId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.modelService.getModels().subscribe(models => {
      console.log("Modèles récupérés:", models);  
      this.models = models;  
    }, error => {
      console.error("Erreur lors de la récupération des modèles:", error);
    });
  
    this.prestationService.getPrestations().subscribe(prestations => {
      console.log("Prestations récupérées:", prestations);  
      this.prestations = prestations;  
    }, error => {
      console.error("Erreur lors de la récupération des prestations:", error);
    });
  }
  

  // Soumission du formulaire
  onSubmit() {
    if (this.pieceForm.valid) {
      const formData = this.pieceForm.value;

      this.pieceService.ajouterPiece(formData).subscribe({
        next: (response) => {
          alert('Pièce ajoutée avec succès !');
          this.pieceForm.reset(); 
        },
        error: (error) => {
          alert(error.error.erreur || 'Une erreur est survenue');
        }
      });
    } else {
      alert('Veuillez remplir correctement tous les champs');
    }
  }

  // Méthode pour annuler
  onCancel() {
    this.pieceForm.reset();
  }

}
