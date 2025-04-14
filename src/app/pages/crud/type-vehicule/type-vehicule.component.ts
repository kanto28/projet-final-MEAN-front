import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { TypeVehiculeService } from '../../../services/crud/typeVehicule/type-vehicule.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-type-vehicule',
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
    ProgressBarModule
  ],
  templateUrl: './type-vehicule.component.html',
  styleUrl: './type-vehicule.component.scss',
  providers: [MessageService]
})
export class TypeVehiculeComponent implements OnInit{

  typeVehiculeName: string = '';
  typeVehicules: any[] = [];
  selectedTypeVehicule: any = null;
  editTypeVehiculeDialog: boolean = false;
  typeVehiculeToDelete: any = null;

  ajoutTypeVehicule: boolean = false;
  submitted: boolean = false;
  displayConfirmation: boolean = false;
  loading: boolean = false;

  errorMessage: string = '';

  constructor(
    private typeVehiculeService: TypeVehiculeService,
    private cdRef: ChangeDetectorRef,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadTypeVehicule();
  }

  // Afficher un message avec PrimeNG
  private showAlert(type: 'success' | 'error', message: string) {
    this.messageService.add({
      severity: type,
      summary: type === 'success' ? 'Succès' : 'Erreur',
      detail: message,
      life: 5000
    });
  }

  // Charger tous les types de véhicules
  loadTypeVehicule(): void {
    this.loading = true;
    this.typeVehiculeService.getTypeVehicules().subscribe({
      next: (data) => {
        this.typeVehicules = data;
      },
      error: (error) => {
        this.showAlert('error', 'Erreur lors du chargement des types de véhicule');
      },
      complete: () => {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // Créer un type de véhicule
  onCreateTypeVehicule() {
    if (!this.typeVehiculeName.trim()) {
      this.showAlert('error', 'Le nom du type de véhicule est requis');
      return;
    }

    this.loading = true;
    this.typeVehiculeService.createTypeVehicule(this.typeVehiculeName).subscribe({
      next: () => {
        this.showAlert('success', 'Type de véhicule créé avec succès');
        this.ajoutTypeVehicule = false;
        this.typeVehiculeName = '';
        this.loadTypeVehicule();
      },
      error: (err) => {
        this.errorMessage = err.error?.erreur || 'Erreur lors de la création';
        this.showAlert('error', this.errorMessage);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Modifier un type de véhicule
  onUpdateTypeVehicule() {
    if (!this.selectedTypeVehicule?.name?.trim()) {
      this.showAlert('error', 'Le nom du type de véhicule est requis');
      return;
    }

    this.loading = true;
    this.typeVehiculeService.updateTypeVehicule(this.selectedTypeVehicule._id, this.selectedTypeVehicule.name).subscribe({
      next: () => {
        this.showAlert('success', 'Type de véhicule mis à jour avec succès');
        this.editTypeVehiculeDialog = false;
        this.selectedTypeVehicule = null;
        this.loadTypeVehicule();
      },
      error: (err) => {
        this.showAlert('error', err.error?.erreur || 'Erreur lors de la mise à jour');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Supprimer un type de véhicule
  onDeleteTypeVehicule() {
    if (!this.typeVehiculeToDelete?._id) {
      this.showAlert('error', 'Aucun type sélectionné');
      return;
    }

    this.loading = true;
    this.typeVehiculeService.deleteTypeVehicule(this.typeVehiculeToDelete._id).subscribe({
      next: () => {
        this.showAlert('success', 'Type de véhicule supprimé avec succès');
        this.displayConfirmation = false;
        this.typeVehiculeToDelete = null;
        this.loadTypeVehicule();
      },
      error: (err) => {
        this.showAlert('error', err.error?.erreur || 'Erreur lors de la suppression');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Ouvrir le formulaire d’ajout
  ovrirNouveauTypeVehicule() {
    this.submitted = false;
    this.ajoutTypeVehicule = true;
  }

  // Fermer le formulaire d’ajout
  hideAjoutTypeVehicule() {
    this.ajoutTypeVehicule = false;
  }

  // Ouvrir le formulaire de modification
  openEditTypeVehiculeDialog(typeVehicule: any) {
    this.selectedTypeVehicule = { ...typeVehicule };
    this.editTypeVehiculeDialog = true;
  }

  // Fermer le formulaire de modification
  hideEditTypeVehiculeDialog() {
    this.editTypeVehiculeDialog = false;
    this.selectedTypeVehicule = null;
  }

  // Ouvrir la boîte de confirmation de suppression
  openConfirmation(typeVehicule: any) {
    this.typeVehiculeToDelete = typeVehicule;
    this.displayConfirmation = true;
  }

  // Fermer la boîte de confirmation
  closeConfirmation() {
    this.displayConfirmation = false;
    this.typeVehiculeToDelete = null;
  }

}

