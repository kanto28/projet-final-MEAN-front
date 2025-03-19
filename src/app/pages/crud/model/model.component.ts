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
import { ModelService } from '../../../services/crud/model/model.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-model',
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
    DropdownModule
  ],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent {
  models: any[] = [];
  modelName: string = '';
  selectedModel: any = null;
  editModelDialog: boolean = false;
  modelToDelete: any = null;
  displayConfirmation: boolean = false;

  selectedMarque: string = ''; 
  selectedTypeVehicule: string = ''; 

  marques: any[] = []; 
  typeVehicules: any[] = []; 
  ajoutModel: boolean = false; 



  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
    this.loadModels();
    this.loadMarques(); 
    this.loadTypeVehicules(); 
  }

  // Charger tous les modèles
  loadModels(): void {
    this.modelService.getModels().subscribe(
      (data) => {
        this.models = data;
        console.log('Modèles récupérés :', this.models);
      },
      (error) => {
        console.error('Erreur lors de la récupération des modèles', error);
      }
    );
  }

   // Charger les marques
   loadMarques(): void {
    this.modelService.getMarques().subscribe(
      (data) => {
        this.marques = data;
        console.log('Marques récupérées :', this.marques);
      },
      (error) => {
        console.error('Erreur lors de la récupération des marques', error);
      }
    );
  }

  // Charger les types de véhicules
  loadTypeVehicules(): void {
    this.modelService.getTypeVehicules().subscribe(
      (data) => {
        this.typeVehicules = data;
        console.log('Types de véhicules récupérés :', this.typeVehicules);
      },
      (error) => {
        console.error('Erreur lors de la récupération des types de véhicules', error);
      }
    );
  }

  // Ouvrir le dialogue d'ajout
  openAddModelDialog(): void {
    this.ajoutModel = true;
  }

  // Fermer le dialogue d'ajout
  hideDialog(): void {
    this.ajoutModel = false;
    this.modelName = '';
    this.selectedMarque = '';
    this.selectedTypeVehicule = '';
  }

 
  // Créer un modèle
  onCreateModel(): void {
    this.modelService.createModel(this.modelName, this.selectedMarque, this.selectedTypeVehicule).subscribe(
      (response) => {
        console.log('Modèle créé avec succès', response);
        this.loadModels(); // Recharger la liste des modèles
        this.hideDialog();
      },
      (error) => {
        console.error('Erreur lors de la création du modèle', error);
      }
    );
  }

  // Ouvrir le dialogue de mise à jour
  openEditModelDialog(model: any): void {
    this.selectedModel = { ...model };
    this.editModelDialog = true;
  }

  // Mettre à jour un modèle
  // onUpdateModel(): void {
  //   if (this.selectedModel) {
  //     this.modelService.updateModel(this.selectedModel._id, this.selectedModel.name, this.selectedModel.marque, this.selectedModel.typeVehicule).subscribe(
  //       (response) => {
  //         console.log('Modèle mis à jour avec succès', response);
  //         this.loadModels(); // Recharger la liste des modèles
  //         this.editModelDialog = false; // Fermer le dialogue
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la mise à jour du modèle', error);
  //       }
  //     );
  //   }
  // }

  onUpdateModel(): void {
    if (this.selectedModel) {
      const updatedModel = {
        name: this.selectedModel.name,
        marque: this.selectedModel.marque._id, // ID de la marque sélectionnée
        typeVehicule: this.selectedModel.typeVehicule._id // ID du type de véhicule sélectionné
      };
  
      this.modelService.updateModel(this.selectedModel._id, updatedModel).subscribe(
        (response) => {
          console.log('Modèle mis à jour avec succès', response);
          this.loadModels(); // Recharger la liste des modèles
          this.editModelDialog = false; // Fermer le dialogue
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du modèle', error);
        }
      );
    }
  }

  // Ouvrir le dialogue de confirmation de suppression
  openConfirmation(model: any): void {
    this.modelToDelete = model;
    this.displayConfirmation = true;
  }

  // Supprimer un modèle
  onDeleteModel(): void {
    if (this.modelToDelete) {
      this.modelService.deleteModel(this.modelToDelete._id).subscribe(
        (response) => {
          console.log('Modèle supprimé avec succès', response);
          this.loadModels(); // Recharger la liste des modèles
          this.displayConfirmation = false; // Fermer le dialogue
        },
        (error) => {
          console.error('Erreur lors de la suppression du modèle', error);
        }
      );
    }
  }
}
