// prestation.model.ts
export interface Prestation {
  _id?: string;
  name: string;
  duree: number;
  typeVehicule: string;
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
}