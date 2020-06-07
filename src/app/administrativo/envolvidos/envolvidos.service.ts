import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {SICA_API} from '../../app.api';
import {EnvolvidoModel} from '../../shared/models/envolvido.model';
import {EnvolvidoDTO} from '../../shared/dto/envolvidoDTO';



@Injectable()
export class EnvolvidosService {

  envolvido: EnvolvidoModel;

  constructor(private http: HttpClient) {}

  buscarEnvolvidos(): Observable<EnvolvidoDTO> {
    return this.http.get<EnvolvidoDTO>(`${SICA_API}/envolvido`);
  }

  incluirZona(envolvido: EnvolvidoModel): Observable<EnvolvidoModel> {
    return this.http.post<EnvolvidoModel>(`${SICA_API}/zona`, envolvido)
      .pipe(tap(resultado => this.envolvido = envolvido));
  }

}
