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
import { ProgressBarModule } from 'primeng/progressbar';

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
    SelectModule,
    DropdownModule,
    ProgressBarModule
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
  ajoutModel: boolean = false;
  
  selectedMarque: string = ''; 
  selectedTypeVehicule: string = ''; 
  marques: any[] = []; 
  typeVehicules: any[] = []; 
  
  loading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  constructor(private modelService: ModelService) { }

  ngOnInit(): void {
    this.loadModels();
    this.loadMarques(); 
    this.loadTypeVehicules(); 
  }

  private showAlert(type: 'success' | 'error', message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  // Charger tous les modèles
  loadModels(): void {
    this.loading = true;
    this.modelService.getModels().subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des modèles', error);
        this.showAlert('error', 'Erreur lors du chargement des modèles');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Charger les marques
  loadMarques(): void {
    this.loading = true;
    this.modelService.getMarques().subscribe({
      next: (data) => {
        this.marques = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des marques', error);
        this.showAlert('error', 'Erreur lors du chargement des marques');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Charger les types de véhicules
  loadTypeVehicules(): void {
    this.loading = true;
    this.modelService.getTypeVehicules().subscribe({
      next: (data) => {
        this.typeVehicules = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des types de véhicules', error);
        this.showAlert('error', 'Erreur lors du chargement des types de véhicules');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
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
    if (!this.modelName.trim() || !this.selectedMarque || !this.selectedTypeVehicule) {
      this.showAlert('error', 'Veuillez remplir tous les champs');
      return;
    }

    this.loading = true;
    this.modelService.createModel(this.modelName, this.selectedMarque, this.selectedTypeVehicule).subscribe({
      next: (response) => {
        this.showAlert('success', 'Modèle créé avec succès');
        this.loadModels(); 
        this.hideDialog();
      },
      error: (error) => {
        console.error('Erreur lors de la création du modèle', error);
        this.showAlert('error', 'Erreur lors de la création du modèle');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openEditModelDialog(model: any) {
    this.selectedModel = { ...model };
    this.selectedModel.marque = this.marques.find(m => m._id === model.marque._id || m._id === model.marque) || null;
    this.selectedModel.typeVehicule = this.typeVehicules.find(t => t._id === model.typeVehicule._id || t._id === model.typeVehicule) || null;
    this.editModelDialog = true;
  }

  onUpdateModel(): void {
    if (!this.selectedModel?.name?.trim() || !this.selectedModel?.marque || !this.selectedModel?.typeVehicule) {
      this.showAlert('error', 'Veuillez remplir tous les champs');
      return;
    }

    this.loading = true;
    const updatedModel = {
      name: this.selectedModel.name,
      marque: typeof this.selectedModel.marque === 'object' ? this.selectedModel.marque._id : this.selectedModel.marque,
      typeVehicule: typeof this.selectedModel.typeVehicule === 'object' ? this.selectedModel.typeVehicule._id : this.selectedModel.typeVehicule
    };

    this.modelService.updateModel(this.selectedModel._id, updatedModel).subscribe({
      next: (response) => {
        this.showAlert('success', 'Modèle mis à jour avec succès');
        this.loadModels(); 
        this.editModelDialog = false; 
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du modèle', error);
        this.showAlert('error', 'Erreur lors de la mise à jour du modèle');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Ouvrir le dialogue de confirmation de suppression
  openConfirmation(model: any): void {
    this.modelToDelete = model;
    this.displayConfirmation = true;
  }

  // Supprimer un modèle
  onDeleteModel(): void {
    this.loading = true;
    this.modelService.deleteModel(this.modelToDelete._id).subscribe({
      next: (response) => {
        this.showAlert('success', 'Modèle supprimé avec succès');
        this.loadModels(); 
        this.displayConfirmation = false; 
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du modèle', error);
        this.showAlert('error', 'Erreur lors de la suppression du modèle');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
