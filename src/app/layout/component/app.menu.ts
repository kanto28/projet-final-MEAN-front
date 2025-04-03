import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];
    menuItems: any[];
    role: string;

    constructor(private authService: AuthService, private router: Router) {
      this.menuItems = [
        { label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', command: () => this.onLogout() }
      ];
      this.role = this.authService.getUserRole();
    }
  
    onLogout() {
        this.authService.logout(); 
        this.router.navigate(['/auth/login']); 
      }

    ngOnInit() {
        this.model = [];
        // Afficher Accueil uniquement pour les Managers
        if (this.role === 'Manager') { 
            this.model.push({
                label: 'Accueil',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            });
        }
        this.model.push(
            {
                label: 'Rendez-vous',
                items: [
                    {
                        label: 'RDV',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            { label: 'Validation Rdv', icon: 'pi pi-fw pi-home', routerLink: ['/pages/rdv/validationrdv'] },
                            { label: 'planning', icon: 'pi pi-fw pi-home', routerLink: ['/pages/rdv/planningmec'] },
                            { label: 'mecanicien dispo', icon: 'pi pi-fw pi-home', routerLink: ['/pages/rdv/listemecdispo'] },
                            { label: 'prix rdv', icon: 'pi pi-fw pi-home', routerLink: ['/pages/rdv/prixrdv'] }
                        ]
                    }
                    
                ]
            },
            {
                label: 'Gestion du Garage',
                items: [
                    // { label: 'Page Test', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/test'] },
                    {
                        label: 'Gestion des CRUD',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {label: 'Marque',icon: 'pi pi-fw pi-car',routerLink: ['/pages/crud/marque']},
                            {label: 'Energie', icon: 'pi pi-fw pi-bolt',routerLink: ['/pages/crud/energie']},
                            {label: 'Model',icon: 'pi pi-fw pi-tags',routerLink: ['/pages/crud/model']},
                            {label: 'Moteur', icon: 'pi pi-fw pi-wrench', routerLink: ['/pages/crud/moteur']},
                            {label: 'Prestation',icon: 'pi pi-fw pi-check-circle',routerLink: ['/pages/crud/prestation']},
                            {label: 'Transmission',icon: 'pi pi-fw pi-share-alt',routerLink: ['/pages/crud/transmission']},
                            {label: 'Type de Vehicule',icon: 'pi pi-fw pi-truck',routerLink: ['/pages/crud/typeVehicule']}
                        ]
                    },
                    {
                        label: 'Gestion des Pièces',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {label: 'Liste Piece',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/pieces/piece']},
                            //{ label: 'Prix d une piece', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/pieces/prixpiece']},
                            {label: 'etat de stock(entre et sortie)',icon: 'pi pi-fw pi-download',routerLink: ['/pages/pieces/etatstockpiece']},
                           // {label: 'historique stock', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/pieces/historiquestock']},
                            {label:'add piece',icon: 'pi pi-fw pi-download', routerLink:['pages/pieces/addPiece']},
                            //{label:'detail piece',  icon: 'pi pi-fw pi-dollar', routerLink:['pages/pieces/detailPiece']},
                           // {label:'dahboard stock', routerLink:['pages/pieces/dashboradStock']}
                        ]
                    },
                    {
                        label: 'Prestation',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            
                            {label: 'Liste Prestation',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/prestation/listeprestation']},
                            {label: 'Detail Prestation',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/prestation/detailprestation']},
                            { label: 'Affectation Presation', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/prestation/affectationprestation']},
                            {label: 'Prestation mechanicien',icon: 'pi pi-fw pi-download',routerLink: ['/pages/prestation/mechanicienprestation']},
                            //{label: 'Prix presation', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/prestation/prixprestation']}
                            // {label:'add piece', routerLink:['pages/pieces/addPiece']},
                            // {label:'detail piece', routerLink:['pages/pieces/detailPiece']},
                            // {label:'dahboard stock', routerLink:['pages/pieces/dashboradStock']}
                        ]
                    },
                    {
                        label: 'Gestion de Vehicule',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            
                            {label: 'Ajout Vehicule',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/vehicules/ajoutvehicule']},
                            {label: 'Detail Vehicule',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/vehicules/detailvehicule']},
                            { label: 'liste Vehicule', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/vehicules/listevehicule']},
                            {label: 'Modification Vehicule',icon: 'pi pi-fw pi-download',routerLink: ['/pages/vehicules/modifvehicule']}
                        ]
                    },
                    {
                        label: 'Gestion de Vehicule Utilisateur',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            
                            {label: 'Ajout Vehicule user',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/vehiculesuser/ajoutvehiculeuser']},
                            {label: 'Detail Vehicule user' ,icon: 'pi pi-fw pi-cog',routerLink: ['/pages/vehiculesuser/detailvehiculeuser']},
                            { label: 'liste Vehicule user', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/vehiculesuser/vehiculeUtilisateur']},
                            {label: 'Modification Vehicule user',icon: 'pi pi-fw pi-download',routerLink: ['/pages/vehiculesuser/modifvehiculeuser']}
                        ]
                    },
                    {
                        label: ' Prix Prestation',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            
                            {label: 'Liste Prix Prestation',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/prixprestation/listepres']},
                            {label: 'Ajout Prix Prestation',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/prixprestation/ajoutpres']},
                            { label: 'Modifier prix Presation', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/prixprestation/modifpres']},
                            {label: 'Historique mechanicien',icon: 'pi pi-fw pi-download',routerLink: ['/pages/prixprestation/historiquepres']},
                            {label: 'Prix presation', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/prixprestation/statutpres']}
                        ]
                    },
                    { label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', command: () => this.onLogout() }
                ]
            })
           
    }
}
