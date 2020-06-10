import {Component, OnInit} from '@angular/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventoModel} from '../../shared/models/evento.model';
import {LoginService} from '../../security/login/login.service';
import {EventoDTO} from '../../shared/dto/eventoDTO';
import {EventoService} from './evento.service';
import {SelectItem} from '../../shared/models/selectItem.model';
import {NotificationService} from '../../shared/massages/snackbar/notification.service';


@Component({
  selector: 'app-adm-eventos',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  incluirEventoForm: FormGroup;
  Evento: EventoDTO;
  listaEventos: EventoDTO[];
  eventoSelecionado: EventoModel = new EventoModel();
  sensorSelected: SelectItem = {'id': 0, 'itemName': 'Selecione'};
  sensoresList: SelectItem[];


  constructor(private fb: FormBuilder,
              private eventosService: EventoService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.incluirEventoForm = this.fb.group({
      data: this.fb.control('', [Validators.required]),
      evento: this.fb.control('', [Validators.required]),
      intensidade: this.fb.control('', [Validators.required]),
      sensor: this.fb.control('', [Validators.required]),
    });

    this.buscarEventos();
    this.buscarSensores();


  }

  onChangeSensor(target) {
    const valor: number = target.value;
    this.sensorSelected = this.sensoresList.find(element => element.id === Number(valor));
  }

  buscarEventos() {
    // Busca Eventos
    this.eventosService.buscarEventos()
      .subscribe(listaEventos => {
          this.listaEventos = listaEventos;
          console.log(this.listaEventos);
        }
      );
  }


  buscarSensores() {
    // Busca Zonas e convertendo para SelectItem
    this.eventosService.buscarSensores()
      .subscribe(listaSensores => {
          this.sensoresList = listaSensores.map(sensor => ({id: sensor.idSensor, itemName: sensor.nomeSensor}));
          this.sensorSelected = this.sensoresList[0];
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        }
      );
  }

  novoEvento() {
    this.eventoSelecionado = new EventoModel();
  }


  salvar(eventoSelecionado: EventoModel) {

    this.eventosService.incluirEvento(eventoSelecionado)
      .subscribe(resultado => {
          this.notificationService.notify('Incluido com sucesso');
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        }
        ,

        () => {
          this.buscarEventos();
        }
      );
  }

  excluirEventoPorId(idEvento: number) {
    this.eventosService.excluirEventoPorId(idEvento.toString())
      .subscribe((data) => {
          this.notificationService.notify('Excluido com sucesso');
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        },
        () => {
          this.buscarEventos();
        }
      );
  }


}
