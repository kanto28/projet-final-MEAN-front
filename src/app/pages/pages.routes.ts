import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { TestComponent } from './test/test.component';
import { MarqueComponent } from './crud/marque/marque.component';
import { ActionComponent } from './crud/action/action.component';
import { EnergieComponent } from './crud/energie/energie.component';
import { ModelComponent } from './crud/model/model.component';
import { MoteurComponent } from './crud/moteur/moteur.component';
import { PrestationComponent } from './crud/prestation/prestation.component';
import { TransmissionComponent } from './crud/transmission/transmission.component';
import { TypeVehiculeComponent } from './crud/type-vehicule/type-vehicule.component';
import { PieceComponent } from './pieces/piece/piece.component';
import { PrixpieceComponent } from './pieces/prixpiece/prixpiece.component';
import { EtatstockpieceComponent } from './pieces/etatstockpiece/etatstockpiece.component';
import { HistoriquestockComponent } from './pieces/historiquestock/historiquestock.component';
import { AddPieceComponent } from './pieces/add-piece/add-piece.component';
import { DetailpieceComponent } from './pieces/detailpiece/detailpiece.component';
import { ListepresationComponent } from './prestation/listepresation/listepresation.component';
import { DetailprestationComponent } from './prestation/detailprestation/detailprestation.component';
import { AffectationprestationComponent } from './prestation/affectationprestation/affectationprestation.component';
import { MechanicienprestationComponent } from './prestation/mechanicienprestation/mechanicienprestation.component';
import { PieceprestationComponent } from './pieces/pieceprestation/pieceprestation.component';
import { ListepresComponent } from './prixprestation/listepres/listepres.component';
import { AjoutpresComponent } from './prixprestation/ajoutpres/ajoutpres.component';
import { ModifpresComponent } from './prixprestation/modifpres/modifpres.component';
import { StatutpresComponent } from './prixprestation/statutpres/statutpres.component';
import { HistoriquepresComponent } from './prixprestation/historiquepres/historiquepres.component';
import { AjoutvehiculeComponent } from './vehicules/ajoutvehicule/ajoutvehicule.component';
import { DetailvehiculeComponent } from './vehicules/detailvehicule/detailvehicule.component';
import { ListevehiculeComponent } from './vehicules/listevehicule/listevehicule.component';
import { ModifvehiculeComponent } from './vehicules/modifvehicule/modifvehicule.component';
import { VehiculesUtilisateurComponent } from './vehiculesuser/vehicules-utilisateur/vehicules-utilisateur.component';
import { AjoutvehiculeuserComponent } from './vehiculesuser/ajoutvehiculeuser/ajoutvehiculeuser.component';
import { ModifvehiculeuserComponent } from './vehiculesuser/modifvehiculeuser/modifvehiculeuser.component';
import { DetailvehiculeuserComponent } from './vehiculesuser/detailvehiculeuser/detailvehiculeuser.component';
import { UserVehiculeComponent } from './clients/vehicule/user-vehicule/user-vehicule.component';
import { UserVehiculeAjoutComponent } from './clients/vehicule/user-vehicule-ajout/user-vehicule-ajout.component';
import { ListerendezvouComponent } from './clients/rendezvous/listerendezvou/listerendezvou.component';
import { AjoutrendezvouComponent } from './clients/rendezvous/ajoutrendezvou/ajoutrendezvou.component';
import { DetailrendezvouComponent } from './clients/rendezvous/detailrendezvou/detailrendezvou.component';
import { ValidationrdvComponent } from './rdv/validationrdv/validationrdv.component';
import { PlanningmecComponent } from './rdv/planningmec/planningmec.component';
import { ListemecdispoComponent } from './rdv/listemecdispo/listemecdispo.component';
import { PrixrdvComponent } from './rdv/prixrdv/prixrdv.component';
import { DevisComponent } from './clients/rendezvous/devis/devis.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'test', component: TestComponent },
    // CRUD
    { path: 'crud/marque', component: MarqueComponent},
    { path: 'crud/action', component: ActionComponent},
    { path: 'crud/energie', component: EnergieComponent},
    { path: 'crud/model', component: ModelComponent},
    { path: 'crud/moteur', component: MoteurComponent },
    { path: 'crud/prestation', component: PrestationComponent},
    { path: 'crud/transmission', component: TransmissionComponent},
    { path: 'crud/typeVehicule', component: TypeVehiculeComponent},
    // Piece
    { path: 'pieces/piece', component: PieceComponent}, //liste
    //{ path: 'pieces/prixpiece', component: PrixpieceComponent},
    {path: 'pieces/etatstockpiece', component: EtatstockpieceComponent},
    //{path: 'pieces/historiquestock', component: HistoriquestockComponent},
    {path: 'pieces/addPiece', component: AddPieceComponent},//ajout
    {path: 'pieces/detailPiece/:id', component: DetailpieceComponent},//detail
    //prestation
    {path: 'prestation/listeprestation', component: ListepresationComponent},
    {path: 'prestation/detailprestation', component: DetailprestationComponent},
    {path: 'prestation/affectationprestation', component: AffectationprestationComponent},
    {path: 'prestation/mechanicienprestation', component: MechanicienprestationComponent},
    {path: 'prestation/prixprestation', component: PieceprestationComponent},

    //prix Prestation
    {path: 'prixprestation/listepres', component: ListepresComponent},
    {path: 'prixprestation/ajoutpres', component: AjoutpresComponent},
    {path: 'prixprestation/modifpres', component: ModifpresComponent},
    {path: 'prixprestation/historiquepres', component: HistoriquepresComponent},
    {path: 'prixprestation/statutpres', component: StatutpresComponent},

    //Vehicule
    {path: 'vehicules/ajoutvehicule', component: AjoutvehiculeComponent},
    {path: 'vehicules/detailvehicule', component: DetailvehiculeComponent},
    {path: 'vehicules/listevehicule', component: ListevehiculeComponent},
    {path: 'vehicules/modifvehicule', component: ModifvehiculeComponent},

     //Vehicule utilisateur
     {path: 'vehiculesuser/vehiculeUtilisateur', component: VehiculesUtilisateurComponent},
     {path: 'vehiculesuser/ajoutvehiculeuser', component: AjoutvehiculeuserComponent},
     {path: 'vehiculesuser/modifvehiculeuser', component: ModifvehiculeuserComponent},
     {path: 'vehiculesuser/detailvehiculeuser', component: DetailvehiculeuserComponent},


      //Cote client voiture
      {path: 'clients/vehicule/userVehicule', component: UserVehiculeComponent},
        {path: 'clients/vehicule/userVehiculeAjout', component: UserVehiculeAjoutComponent},

        //rendez-vous
      {path: 'clients/rendezvous/listerendezvou', component: ListerendezvouComponent},
      {path: 'clients/rendezvous/ajoutrendezvou', component: AjoutrendezvouComponent},
      {path: 'clients/rendezvous/detailrendevous', component: DetailrendezvouComponent},
      {path: 'clients/rendezvous/devis', component: DevisComponent},


 //rendez-vous manager
 {path: 'rdv/validationrdv', component: ValidationrdvComponent},
 {path: 'rdv/planningmec', component: PlanningmecComponent},
 {path: 'rdv/listemecdispo', component: ListemecdispoComponent},
 {path: 'rdv/prixrdv', component: PrixrdvComponent},

    { path: '**', redirectTo: '/notfound' }
] as Routes;
