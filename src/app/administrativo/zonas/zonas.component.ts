import {Component, OnInit} from '@angular/core';

import {Utility} from '../../shared/utility.service';
import {Router} from '@angular/router';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import {NotificationService} from '../../shared/massages/snackbar/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ZonaDTO} from '../../shared/dto/zonaDTO';
import {ZonaModel} from '../../shared/models/zona.model';
import {LoginService} from '../../security/login/login.service';
import {ZonasService} from './zonas.service';


const PrimaryGreen = '#82C83C';
const SecondaryGrey = '#ccc';

@Component({
  selector: 'app-adm-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export class ZonasComponent implements OnInit {

  incluirZonaForm: FormGroup;
  zona: ZonaDTO;
  listaZonas: ZonaDTO[];
  zonaSelecionado: ZonaModel = new ZonaModel();



  constructor(private fb: FormBuilder,
              private zonasService: ZonasService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.incluirZonaForm = this.fb.group({
      nomeZona: this.fb.control('', [Validators.required])
    });

    this.buscarZonas();



  }

  buscarZonas() {
    // Busca Zonas
        this.zonasService.buscarZonas()
          .subscribe(listaZonas => {
              this.listaZonas = listaZonas;
            console.log(this.listaZonas);
            }

          );
  }

  novaZona() {
    this.zonaSelecionado = new ZonaModel();
  }


  salvar(zonaSelecionado: ZonaModel) {

    this.zonasService.incluirZona(zonaSelecionado)
      .subscribe(resultado => {
          console.log('ok');
        }, error => console.log('Error: ', error),

        () => {
          this.buscarZonas();
        }

      );
  }



}
