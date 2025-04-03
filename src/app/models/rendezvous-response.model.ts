export interface RendezVousResponse {
    message: string;
    rendez: {
      _id: string;
      vehicule: string;
      user: string;
      Mvola: string;
      createdAt: Date;
    };
    devis: Array<{
      prestation?: string;
      prixPrestation?: number;
      piece?: string;
      prixPiece?: number;
    }>;
    prixTotal: number;
  }