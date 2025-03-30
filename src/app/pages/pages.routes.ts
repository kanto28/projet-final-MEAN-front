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
import { StockDashboardComponent } from './pieces/stock-dashboard/stock-dashboard.component';
import { AddPieceComponent } from './pieces/add-piece/add-piece.component';

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
    { path: 'pieces/piece', component: PieceComponent},
    { path: 'pieces/prixpiece', component: PrixpieceComponent},
    //{ path: 'pieces/pieceprestation', component: PieceprestationComponent},
    {path: 'pieces/etatstockpiece', component: EtatstockpieceComponent},
    {path: 'pieces/historiquestock', component: HistoriquestockComponent},
    {path: 'pieces/dashboradStock', component: StockDashboardComponent},
    {path: 'pieces/addPiece', component: AddPieceComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
