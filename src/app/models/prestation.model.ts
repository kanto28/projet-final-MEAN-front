
export interface Prestation {
  _id?: string; // Optionnel, car il est généré par MongoDB
  name: string;
  duree: number;
  typeVehicule: string; // ID du type de véhicule
  user?: string; // Optionnel, car il peut être ajouté plus tard
}