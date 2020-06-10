
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {EnvolvidosComponent} from './envolvidos/envolvidos.component';
import {AdministrativoComponent} from './administrativo.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EnvolvidosService} from './envolvidos/envolvidos.service';
import {NgxLoadingModule} from 'ngx-loading';
import {ZonasComponent} from './zonas/zonas.component';
import {ZonasService} from './zonas/zonas.service';
import {EventoComponent} from './evento/evento.component';
import {SensorComponent} from './sensor/sensor.component';
import {EventoService} from './evento/evento.service';
import {SensoresService} from './sensor/sensor.service';


const ROUTES: Routes = [
  { path: 'envolvidos', component: EnvolvidosComponent },
  { path: 'zonas', component: ZonasComponent },
  { path: 'sensores', component: SensorComponent },
  { path: 'eventos', component: EventoComponent },
/*  {path:  'admin', loadChildren: './admin/admin.module#AdminModule',
    canLoad: [LoggedInGuard], canActivate: [LoggedInGuard], data: {tipoContaExpected: '2'} },*/
  {path: '', component: AdministrativoComponent}
];

@NgModule({
  declarations: [
    AdministrativoComponent,
    EnvolvidosComponent,
    ZonasComponent,
    EventoComponent,
    SensorComponent
  ],
  imports: [SharedModule,
    RouterModule.forChild(ROUTES), NgxLoadingModule, NgbModule
  ],
  providers: [
    EnvolvidosService,
    ZonasService,
    EventoService,
    SensoresService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdministrativoModule {}
