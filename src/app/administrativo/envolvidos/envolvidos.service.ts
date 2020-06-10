import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {EnvolvidoModel} from '../../shared/models/envolvido.model';
import {EnvolvidoDTO} from '../../shared/dto/envolvidoDTO';
import {SICA_API} from '../../app.api';
import {ZonaDTO} from '../../shared/dto/zonaDTO';



@Injectable()
export class EnvolvidosService {

  envolvido: EnvolvidoModel;

  constructor(private http: HttpClient) {}

  buscarEnvolvidos(): Observable<EnvolvidoDTO[]> {
    return this.http.get<EnvolvidoDTO[]>(`${SICA_API}/envolvido`);
  }

  incluirEnvolvido(envolvido: EnvolvidoModel): Observable<EnvolvidoModel> {
    console.log('teste');
    return this.http.post<EnvolvidoModel>(`${SICA_API}/envolvido`, envolvido)
      .pipe(tap(resultado => this.envolvido = envolvido));
  }

  buscarZonas(): Observable<ZonaDTO[]> {
    return this.http.get<ZonaDTO[]>(`${SICA_API}/zona`);
  }

  excluirEnvolvidoPorId(idEnvolvido: string): Observable<any> {
    return this.http.delete(`${SICA_API}/envolvido/${idEnvolvido}`);
  }

}
