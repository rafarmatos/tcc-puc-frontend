import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {EventoModel} from '../../shared/models/evento.model';
import {EventoDTO} from '../../shared/dto/eventoDTO';
import {SICA_API} from '../../app.api';
import {ZonaDTO} from '../../shared/dto/zonaDTO';
import {SensorDTO} from '../../shared/dto/sensorDTO';



@Injectable()
export class EventoService {

  evento: EventoModel;

  constructor(private http: HttpClient) {}

  buscarEventos(): Observable<EventoDTO[]> {
    return this.http.get<EventoDTO[]>(`${SICA_API}/evento`);
  }

  incluirEvento(evento: EventoModel): Observable<EventoModel> {
    console.log('teste');
    return this.http.post<EventoModel>(`${SICA_API}/evento`, evento)
      .pipe(tap(resultado => this.evento = evento));
  }

  buscarSensores(): Observable<SensorDTO[]> {
    return this.http.get<SensorDTO[]>(`${SICA_API}/sensor`);
  }

  excluirEventoPorId(idEvento: string): Observable<any> {
    return this.http.delete(`${SICA_API}/evento/${idEvento}`);
  }

}
