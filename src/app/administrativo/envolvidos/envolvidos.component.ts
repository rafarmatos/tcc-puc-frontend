import {Component, OnInit} from '@angular/core';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnvolvidoModel} from '../../shared/models/envolvido.model';
import {LoginService} from '../../security/login/login.service';
import {EnvolvidoDTO} from '../../shared/dto/envolvidoDTO';
import {EnvolvidosService} from './envolvidos.service';
import {SelectItem} from '../../shared/models/selectItem.model';
import {NotificationService} from '../../shared/massages/snackbar/notification.service';
import {CategoriasList} from '../../shared/constants/selectsConst';


@Component({
  selector: 'app-adm-envolvidos',
  templateUrl: './envolvidos.component.html',
  styleUrls: ['./envolvidos.component.scss']
})
export class EnvolvidosComponent implements OnInit {

  incluirEnvolvidoForm: FormGroup;
  listaEnvolvidos: EnvolvidoDTO[];
  envolvidoSelecionado: EnvolvidoModel = new EnvolvidoModel();
  zonaSelected: SelectItem = {'id': 0, 'itemName': 'Selecione'};
  zonasList: SelectItem[];
  categoriaSelected: SelectItem = {'id': 1, 'itemName': 'MORADOR'};
  categoriasList = CategoriasList;


  constructor(private fb: FormBuilder,
              private envolvidosService: EnvolvidosService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.incluirEnvolvidoForm = this.fb.group({
      categoria: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      idZona: this.fb.control(''),
    });

    this.buscarEnvolvidos();
    this.buscarZonas();


  }

  onChangeZona(target) {
    const valor: number = target.value;
    this.zonaSelected = this.zonasList.find(element => element.id === Number(valor));
  }

  onChangeCategoria(target) {
    console.log('valor: '+ target.value);
    this.categoriaSelected = this.categoriasList.find(element => element.itemName === target.value);
  }


  buscarEnvolvidos() {
    // Busca Envolvidos
    this.envolvidosService.buscarEnvolvidos()
      .subscribe(listaEnvolvidos => {
          this.listaEnvolvidos = listaEnvolvidos;
          console.log(this.listaEnvolvidos);
        }
      );
  }


  buscarZonas() {
    // Busca Zonas e convertendo para SelectItem
    this.envolvidosService.buscarZonas()
      .subscribe(listaZonas => {
          this.zonasList = listaZonas.map(zona => ({id: zona.idZona, itemName: zona.nomeZona}));
          this.zonaSelected = this.zonasList[0];
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        }
      );
  }

  novoEnvolvido() {
    this.envolvidoSelecionado = new EnvolvidoModel();
  }


  salvar(envolvidoSelecionado: EnvolvidoModel) {

    this.envolvidosService.incluirEnvolvido(envolvidoSelecionado)
      .subscribe(resultado => {
          this.notificationService.notify('Incluido com sucesso');
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        }
        ,

        () => {
          this.buscarEnvolvidos();
        }
      );
  }

  excluirEnvolvidoPorId(idEnvolvido: number) {
    this.envolvidosService.excluirEnvolvidoPorId(idEnvolvido.toString())
      .subscribe((data) => {
          this.notificationService.notify('Excluido com sucesso');
        }, error => {
          this.notificationService.notify('Erro: ' + error.error.message);
        },
        () => {
          this.buscarEnvolvidos();
        }
      );
  }


}
