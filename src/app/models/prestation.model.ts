export interface Prestation {
  _id?: string; // Optionnel, car généré par MongoDB
  name: string;
  duree: number;
  typeVehicule: string; // ID du type de véhicule
  user?: string; // Optionnel, car l'utilisateur sera extrait du token côté backend
}