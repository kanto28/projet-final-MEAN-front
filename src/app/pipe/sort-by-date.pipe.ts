// src/app/shared/pipes/sort-by-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
  standalone: true // Pour Angular 15+ avec composants standalone
})
export class SortByDatePipe implements PipeTransform {
  /**
   * Trie un tableau d'objets par date
   * @param items Tableau à trier
   * @param field Champ contenant la date
   * @param descending Ordre décroissant (true) ou croissant (false)
   * @returns Tableau trié
   */
  transform(items: any[], field: string, descending: boolean = true): any[] {
    // Si pas de données, retourne un tableau vide
    if (!items) return [];
    
    // Si le champ n'existe pas, retourne le tableau non trié
    if (!field || !items[0].hasOwnProperty(field)) {
      console.warn(`Le champ ${field} n'existe pas pour le tri`);
      return items;
    }

    // Copie du tableau pour éviter de modifier l'original
    return [...items].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();

      return descending ? dateB - dateA : dateA - dateB;
    });
  }
}