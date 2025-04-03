import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AuthService } from '../../../services/auth.service';
import { PrestationService } from '../../../services/crud/prestation/prestation.service';
import { TypeVehiculeService } from '../../../services/crud/typeVehicule/type-vehicule.service';
import { PrxprestationService } from '../../../services/prixprestaion/prxprestation.service';

@Component({
  selector: 'app-ajoutpres',
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
  templateUrl: './ajoutpres.component.html',
  styleUrl: './ajoutpres.component.scss'
})
export class AjoutpresComponent  implements OnInit{
    prestationForm: FormGroup;
    vehicleTypes: any[] = [];
    isLoading = false;
  
    constructor(
      private fb: FormBuilder,
      private prestationService: PrxprestationService,
      private typeVehiculeService: TypeVehiculeService,
      private authService: AuthService,
      private router: Router
    ) {
      this.prestationForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        duree: ['', [Validators.required, Validators.min(1)]],
        typeVehicule: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.loadVehicleTypes();
    }
  
    loadVehicleTypes(): void {
      // Utilisez votre service existant
      this.typeVehiculeService.getTypeVehicules().subscribe({
        next: (types) => {
          this.vehicleTypes = types;
        },
        error: (err) => {
          console.error('Erreur chargement types véhicules:', err);
         
        }
      });
    }
  
    onSubmit(): void {
      if (this.prestationForm.invalid || this.isLoading) return;
    
      this.isLoading = true;
      const userId = this.authService.getUserId(); // Supposons que ça retourne directement l'ID sous forme de string
    
      const prestationData = {
        name: this.prestationForm.value.name,
        duree: this.prestationForm.value.duree,
        typeVehicule: this.prestationForm.value.typeVehicule,
        user: this.authService.getUserId() // Utilisez directement la variable userId au lieu de currentUser.id
        
      };
    
      this.prestationService.createPrestation(prestationData).subscribe({
        next: (response) => {
          this.router.navigate(['/prestations']);
        },
        error: (err) => {
          console.error('Erreur création prestation:', err);
          this.isLoading = false;
        }
      });
    }
}
