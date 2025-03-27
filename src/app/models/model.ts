import { Marque } from "./marque";
import { TypeVehicule } from "./type-vehicule.model";

export interface Model {
    _id: string;
    name: string;
    marque: string | Marque; // Peut être l'ID ou l'objet peuplé
    typeVehicule: string | TypeVehicule; // Peut être l'ID ou l'objet peuplé
  }