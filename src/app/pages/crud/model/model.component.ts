import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
import { MessageService } from 'primeng/api';

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
  styleUrl: './model.component.scss',
  providers: [MessageService]
})
export class ModelComponent {
  modelName: string = '';
  selectedModel: any = null;
  modelToDelete: any = null;

  models: any[] = [];
  marques: any[] = [];
  //marques: { _id: string, name: string }[] = [];
  typeVehicules: any[] = [];

  selectedMarque: string = '';
  selectedTypeVehicule: string = '';

  ajoutModel: boolean = false;
  editModelDialog: boolean = false;
  displayConfirmation: boolean = false;
  submitted: boolean = false;

  loading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showMessage: boolean = false;

  errorMessage: string = '';

  constructor(
    private modelService: ModelService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService
  ) { }

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
      error: (err) => {
        console.error('Erreur chargement modèles', err);
        this.showAlert('error', 'Erreur lors du chargement des modèles');
      },
      complete: () => {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // Charger les marques
  loadMarques(): void {
    this.modelService.getMarques().subscribe({
      next: (data) => this.marques = data,
      error: (err) => {
        console.error('Erreur chargement marques', err);
        this.showAlert('error', 'Erreur chargement des marques');
      }
    });
  }

  // Charger les types de véhicules
  loadTypeVehicules(): void {
    this.modelService.getTypeVehicules().subscribe({
      next: (data) => this.typeVehicules = data,
      error: (err) => {
        console.error('Erreur chargement types véhicules', err);
        this.showAlert('error', 'Erreur chargement types véhicules');
      }
    });
  }

  // Créer un modèle
  onCreateModel(): void {
    if (!this.modelName.trim() || !this.selectedMarque || !this.selectedTypeVehicule) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs',
        life: 5000
      });
      return;
    }

    this.loading = true;
    this.modelService.createModel(this.modelName, this.selectedMarque, this.selectedTypeVehicule).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Modèle créé avec succès',
          life: 3000
        });
        this.ajoutModel = false;
        this.resetForm();
        this.loadModels();
      },
      error: (err) => {
        this.errorMessage = err.error?.erreur || 'Erreur inconnue';
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: this.errorMessage,
          life: 5000
        });
        this.loading = false;
      }
    });
  }

  // Mettre à jour un modèle
  onUpdateModel(): void {
    if (!this.selectedModel?.name?.trim() || !this.selectedModel?.marque || !this.selectedModel?.typeVehicule) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Tous les champs sont requis',
        life: 5000
      });
      return;
    }

    const updatedModel = {
      name: this.selectedModel.name,
      marque: typeof this.selectedModel.marque === 'object' ? this.selectedModel.marque._id : this.selectedModel.marque,
      typeVehicule: typeof this.selectedModel.typeVehicule === 'object' ? this.selectedModel.typeVehicule._id : this.selectedModel.typeVehicule
    };

    this.loading = true;
    this.modelService.updateModel(this.selectedModel._id, updatedModel).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Modèle mis à jour avec succès',
          life: 3000
        });
        this.editModelDialog = false;
        this.selectedModel = null;
        this.loadModels();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.erreur || 'Erreur lors de la mise à jour',
          life: 5000
        });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Supprimer un modèle
  onDeleteModel(): void {
    if (!this.modelToDelete?._id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Aucun modèle sélectionné',
        life: 5000
      });
      return;
    }

    this.loading = true;
    this.modelService.deleteModel(this.modelToDelete._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Modèle supprimé avec succès',
          life: 3000
        });
        this.displayConfirmation = false;
        this.modelToDelete = null;
        this.loadModels();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.erreur || 'Erreur lors de la suppression',
          life: 5000
        });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Ouvrir le formulaire d'ajout
  openAddModelDialog(): void {
    this.submitted = false;
    this.ajoutModel = true;
  }

  // Fermer le formulaire d'ajout
  hideAddModelDialog(): void {
    this.ajoutModel = false;
    this.resetForm();
  }

  // Ouvrir le formulaire de modification
  openEditModelDialog(model: any): void {
    this.selectedModel = {
      ...model,
      marque: this.marques.find(m => m._id === model.marque?._id || m._id === model.marque),
      typeVehicule: this.typeVehicules.find(t => t._id === model.typeVehicule?._id || t._id === model.typeVehicule)
    };
    this.editModelDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditModelDialog(): void {
    this.editModelDialog = false;
    this.selectedModel = null;
  }

  // Ouvrir la boîte de confirmation
  openConfirmation(model: any): void {
    this.modelToDelete = model;
    this.displayConfirmation = true;
  }

  // Fermer la boîte de confirmation
  closeConfirmation(): void {
    this.displayConfirmation = false;
    this.modelToDelete = null;
  }

  // Réinitialiser les champs du formulaire
  private resetForm(): void {
    this.modelName = '';
    this.selectedMarque = '';
    this.selectedTypeVehicule = '';
  }

}
