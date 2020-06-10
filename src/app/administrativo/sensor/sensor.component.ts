import {Component, OnInit} from '@angular/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SensorModel} from '../../shared/models/sensor.model';
import {SensorDTO} from '../../shared/dto/sensorDTO';
import {SensoresService} from './sensor.service';
import {SelectItem} from '../../shared/models/selectItem.model';
import {NotificationService} from '../../shared/massages/snackbar/notification.service';


@Component({
  selector: 'app-adm-sensores',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {

  incluirSensorForm: FormGroup;
  listaSensores: SensorDTO[];
  sensorSelecionado: SensorModel = new SensorModel();
  zonaSelected: SelectItem = {'id': 0, 'itemName': 'Selecione'};
  zonasList: SelectItem[];


  constructor(private fb: FormBuilder,
              private sensoresService: SensoresService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.incluirSensorForm = this.fb.group({
      localizacao: this.fb.control('', [Validators.required]),
      nomeSensor: this.fb.control('', [Validators.required]),
      idZona: this.fb.control(''),
    });

    this.buscarSensores();
    this.buscarZonas();


  }

  onChangeZona(target) {
    const valor: number = target.value;
    this.zonaSelected = this.zonasList.find(element => element.id === Number(valor));
  }

  buscarSensores() {
    // Busca Sensores
    this.sensoresService.buscarSensores()
      .subscribe(listaSensores => {
          this.listaSensores = listaSensores;
          console.log(this.listaSensores);
        }
      );
  }


  buscarZonas() {
    // Busca Zonas e convertendo para SelectItem
    this.sensoresService.buscarZonas()
      .subscribe(listaZonas => {
          this.zonasList = listaZonas.map(zona => ({id: zona.idZona, itemName: zona.nomeZona}));
          this.zonaSelected = this.zonasList[0];
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        }
      );
  }

  novoSensor() {
    this.sensorSelecionado = new SensorModel();
  }


  salvar(sensorSelecionado: SensorModel) {

    this.sensoresService.incluirSensor(sensorSelecionado)
      .subscribe(resultado => {
          this.notificationService.notify('Incluido com sucesso');
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        }
        ,

        () => {
          this.buscarSensores();
        }
      );
  }

  excluirSensorPorId(idSensor: number) {
    this.sensoresService.excluirSensorPorId(idSensor.toString())
      .subscribe((data) => {
          this.notificationService.notify('Excluido com sucesso');
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        },
        () => {
          this.buscarSensores();
        }
      );
  }


}
