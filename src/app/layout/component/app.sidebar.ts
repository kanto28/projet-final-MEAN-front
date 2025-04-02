import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';
import {ClientSidebar } from "./clientsidebar/clientsidebar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu, ClientSidebar , CommonModule],
    template: ` <div class="layout-sidebar">
        <app-menu *ngIf="role === 'Manager' || role === 'Mécanicien'"></app-menu>
        <app-clientsidebar *ngIf="role === 'Client'"></app-clientsidebar>
    </div>`
})
export class AppSidebar {
    role: string = 'Manager';
    constructor(public el: ElementRef) {
        const storedRole = localStorage.getItem('role'); // Vérifie si `role` est stocké
        this.role = storedRole ? storedRole : 'Client'; // Si oui, utilise-le, sinon garde "Client"
        
        console.log("Valeur actuelle de role:", this.role);
    }
}
