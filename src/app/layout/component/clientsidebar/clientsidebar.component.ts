import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '../app.menuitem';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-clientsidebar',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class ClientSidebar {
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
                label: 'Accueil client',
                items: [{ label: 'Dashboard Client', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Prise de rendez-vous',
                items: [
                    // { label: 'Page Test', icon: 'pi pi-fw pi-id-card', routerLink: ['/pages/test'] },
                    {
                      label: ' Voiture',
                      icon: 'pi pi-fw pi-box',
                      items: [
                          
                          {label: 'Liste Prix Prestation',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/prixprestation/listepres']},
                          {label: 'Ajout Prix Prestation',icon: 'pi pi-fw pi-cog',routerLink: ['/pages/prixprestation/ajoutpres']},
                          { label: 'Modifier prix Presation', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/prixprestation/modifpres']},
                          {label: 'Historique mechanicien',icon: 'pi pi-fw pi-download',routerLink: ['/pages/prixprestation/historiquepres']},
                          {label: 'Prix presation', icon: 'pi pi-fw pi-dollar',routerLink: ['/pages/prixprestation/statutpres']}
                      ]
                  },
                  {
                    label: ' Rendez-vous',
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
            }
           
        ];
    }
}
