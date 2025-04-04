import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { VehiculeuserService } from '../../../../services/vehicule/vehiculeuser.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { PrestationService } from '../../../../services/crud/prestation/prestation.service';
import { PrxprestationService } from '../../../../services/prixprestaion/prxprestation.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { RendezvousService } from '../../../../services/rendezvous/rendezvous.service';

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
        SelectModule,
      ],
  templateUrl: './ajoutrendezvou.component.html',
  styleUrl: './ajoutrendezvou.component.scss'
})
export class AjoutrendezvouComponent implements OnInit{
  vehiculeForm: FormGroup;
  vehicules: any[] = [];
  isLoading = true;
  currentUser: any;
  rendezVousForm: FormGroup;

   // ... autres propriétés existantes ...
   prestationsDisponibles: any[] = [];
   selectedPrestations: string[] = [];
   


  constructor(
    private fb: FormBuilder,
    private vehicuUserleService: VehiculeuserService,
    private authService: AuthService, 
    private router: Router,
    private prestationService: PrestationService,
    private prixPrestationService: PrxprestationService,
    private rendezVousService: RendezvousService
  ) {
    this.vehiculeForm = this.fb.group({
      vehicule: ['']
    });
    this.rendezVousForm = this.fb.group({
      vehicule: ['', Validators.required],
      user: [''],
      Mvola: ['', [
        Validators.required,
        Validators.pattern(/^03[2-9]\d{7}$/)
      ]],
      details: this.fb.array([])
    });
  }

  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Utilisateur actuel:', this.currentUser);
  
    // Initialisation du formulaire
    this.rendezVousForm = this.fb.group({
      vehicule: ['', Validators.required],
      user: [this.currentUser?._id || ''],
      Mvola: ['', [
        Validators.required,
        Validators.pattern(/^03[2-9]\d{7}$/)
      ]],
      details: this.fb.array([]) // Initialisation correcte du FormArray
    });
  
    if (this.currentUser?._id) {
      this.loadUserVehicules();
      this.loadPrestations(); // Charger les prestations après vérification de l'utilisateur
    } else {
      console.error('ID utilisateur non disponible');
      this.isLoading = false;
    }
  }
  loadPrestations(): void {
   
      // Chargement simple pour les clients
      this.prestationService.getAllPrestations().subscribe({
        next: (prestations) => {
          this.prestationsDisponibles = prestations.map(p => ({
            ...p,
            currentPrice: null // Masqué pour les clients
          }));
        },
        error: (err) => console.error(err)
      });
    
  }

  
  loadUserVehicules(): void {
    const token = this.authService.getToken();
    if (token && this.currentUser._id) {
      this.vehicuUserleService.getVehiculesByUser(this.currentUser._id).subscribe({
        next: (response) => {
          console.log('Réponse complète:', response);
          // Adaptez selon la structure réelle de la réponse
          this.vehicules = response.map((item: any) => item.vehicule);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur de chargement:', err);
          this.isLoading = false;
        }
      });
    }
  }


  onCheckboxChange(event: any, prestationId: string): void {
    if (event.target.checked) {
      // Ajouter la prestation si cochée
      if (!this.selectedPrestations.includes(prestationId)) {
        this.selectedPrestations.push(prestationId);
      }
    } else {
      // Retirer la prestation si décochée
      this.selectedPrestations = this.selectedPrestations.filter(id => id !== prestationId);
    }
    
    // Mettre à jour le FormArray
    this.updateDetailsFormArray();
  }
  
  updateDetailsFormArray(): void {
    const detailsArray = this.rendezVousForm.get('details') as FormArray;
    detailsArray.clear();
    
    this.selectedPrestations.forEach(prestationId => {
      detailsArray.push(this.fb.group({
        prestation: prestationId
      }));
    });
  }
  
  isPrestationSelected(prestationId: string): boolean {
    return this.selectedPrestations.includes(prestationId);
  }


  // Méthode pour soumettre le formulaire

  onSubmit(): void {
    // Marquer tous les champs comme "touched" pour afficher les erreurs
    this.rendezVousForm.markAllAsTouched();
  
    if (this.rendezVousForm.valid) {
      this.isLoading = true; // Activer le spinner de chargement
  
      // Préparer les données
      const formData = {
        ...this.rendezVousForm.value,
        details: this.rendezVousForm.value.details?.map((d: any) => ({ 
          prestation: d.prestation 
        })) || [] // Gestion du cas où details serait undefined
      };
  
      console.log('Données à envoyer:', formData);
  
      // Appel au service
      this.rendezVousService.createRendezVous(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Rendez-vous créé:', response);
          this.router.navigate(['/confirmation']); // Redirection après succès
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur création:', error);
          // Afficher un message d'erreur à l'utilisateur
          //this.snackBar.open('Erreur lors de la création', 'OK', { duration: 3000 });
        }
      });
    } else {
      console.warn('Formulaire invalide', this.rendezVousForm.errors);
    }
  }

// Helper pour accéder facilement aux contrôles
get f() {
  return this.rendezVousForm.controls;
}


getPrestationControl(prestationId: string): FormControl {
  const detailsArray = this.rendezVousForm.get('details') as FormArray;
  const existing = detailsArray.controls.find(ctrl => ctrl.value.prestation === prestationId);
  
  if (existing) {
    return existing as FormControl;
  }
  
  const newCtrl = new FormControl({ prestation: prestationId });
  detailsArray.push(newCtrl);
  return newCtrl;
}


// goToDevis() {
//   const data = {
//     vehiculeId: this.rendezVousForm.value.vehicule,
//     prestationIds: this.selectedPrestations.map((p: any) => p._id)
//   };
//   this.router.navigate(['/devis'], { state: { data } });
// }


// goToDevis() {
//   console.log('Bouton cliqué!'); // Vérifiez si ce message apparaît dans la console
  
//   // Vérifiez l'état du formulaire
//   console.log('Form valid:', this.rendezVousForm.valid);
//   console.log('Prestations sélectionnées:', this.selectedPrestations);
  
//   // Vérifiez les données avant navigation
//   const data = {
//     vehiculeId: this.rendezVousForm.value.vehicule,
//     prestationIds: this.selectedPrestations.map((p: any) => p._id)
//   };
//   console.log('Données à envoyer:', data);

//   // Testez la navigation simple d'abord
//   this.router.navigate(['/client/rendezvou/devis']).then(success => {
//     console.log('Navigation réussie?', success);
//   }).catch(err => {
//     console.error('Erreur de navigation:', err);
//   });
// }


canGenerateDevis(): boolean {
  const vehiculeSelected = !!this.rendezVousForm.get('vehicule')?.value;
  const hasPrestations = this.selectedPrestations.length > 0;
  return vehiculeSelected && hasPrestations;
}

async goToDevis() {
  if (!this.canGenerateDevis()) {
    alert('Veuillez compléter les informations requises');
    return;
  }

  const vehiculeId = this.rendezVousForm.get('vehicule')?.value;
  const prestationIds = this.selectedPrestations.map((p: any) => p._id);

  console.log('Données VALIDES à envoyer:', { vehiculeId, prestationIds });

  try {
    const success = await this.router.navigate(
      ['/client/rendezvou/devis'], 
      {
        state: {
          vehiculeId,
          prestationIds,
          mvola: this.rendezVousForm.get('Mvola')?.value
        }
      }
    );

    if (!success) {
      alert('La navigation a échoué - Vérifiez la route configurée');
    }
  } catch (error) {
    console.error('Erreur de navigation:', error);
    alert('Erreur lors de la redirection');
  }
}


}
