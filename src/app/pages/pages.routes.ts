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

export default [
    { path: 'empty', component: Empty },
    { path: 'test', component: TestComponent },
    { path: 'crud/marque', component: MarqueComponent},
    { path: 'crud/action', component: ActionComponent},
    { path: 'crud/energie', component: EnergieComponent},
    { path: 'crud/model', component: ModelComponent},
    { path: 'crud/moteur', component: MoteurComponent },
    { path: 'crud/prestation', component: PrestationComponent},
    { path: 'crud/transmission', component: TransmissionComponent},
    { path: 'crud/typeVehicule', component: TypeVehiculeComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
