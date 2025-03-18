import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

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

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Page Test', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/test'] },
                    {
                        label: 'CRUD',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Marque',
                                icon: 'pi pi-fw pi-car',
                                routerLink: ['/pages/crud/marque']
                            },
                            {
                                label: 'Action',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/pages/crud/action']
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
                    }
                    //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] }
                ]
            }
           
        ];
    }
}
