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

    constructor(private authService: AuthService, private router: Router) {
      this.menuItems = [
        { label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', command: () => this.onLogout() }
      ];
    }
  
    onLogout() {
        this.authService.logout(); 
        this.router.navigate(['/auth/login']); 
      }

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Gestion du Garage',
                items: [
                    { label: 'Page Test', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/test'] },
                    {
                        label: 'Gestion des Véhicules',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Marque',
                                icon: 'pi pi-fw pi-car',
                                routerLink: ['/pages/crud/marque']
                            },
                            {
                                label: 'Energie',
                                icon: 'pi pi-fw pi-bolt',
                                routerLink: ['/pages/crud/energie']
                            },
                            {
                                label: 'Model',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: ['/pages/crud/model']
                            },
                            {
                                label: 'Moteur',
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/pages/crud/moteur']
                            },
                            {
                                label: 'Prestation',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/pages/crud/prestation']
                            },
                            {
                                label: 'Transmission',
                                icon: 'pi pi-fw pi-share-alt',
                                routerLink: ['/pages/crud/transmission']
                            },
                            {
                                label: 'Type de Vehicule',
                                icon: 'pi pi-fw pi-truck',
                                routerLink: ['/pages/crud/typeVehicule']
                            }
                        ]
                    },
                    {
                        label: 'Gestion des Pièces',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: 'Catalogue des Pièces',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/pages/test']
                            },
                            {
                                label: 'Ajout de Pièces en Stock',
                                icon: 'pi pi-fw pi-download',
                                routerLink: ['/pages/test']
                            },
                            {
                                label: 'Utilisation des Pièces', //prestation piece
                                icon: 'pi pi-fw pi-wrench',
                                routerLink: ['/pages/test']
                            },
                            {
                                label: 'Tarification des Pièces',
                                icon: 'pi pi-fw pi-dollar',
                                routerLink: ['/pages/crud/typeVehicule']
                            }
                        ]
                    },
                    { label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', command: () => this.onLogout() }
                ]
            }
           
        ];
    }
}
