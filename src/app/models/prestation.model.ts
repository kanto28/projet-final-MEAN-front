// export interface Prestation {
//   _id?: string;
//   name: string;
//   duree: number;
//   typeVehicule: string;
//   user?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// prestation.model.ts
// prestation.model.ts
export interface Prestation {
  _id?: string; // Optionnel pour les nouvelles créations
  name: string;
  duree: number;
  typeVehicule: string | { _id: string; name: string };
  user?: string | { _id: string; username?: string }; // Rend user optionnel
  createdAt?: Date;
  updatedAt?: Date;

  
}