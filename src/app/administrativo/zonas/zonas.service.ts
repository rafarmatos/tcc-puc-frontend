import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {ZonaModel} from '../../shared/models/zona.model';
import {ZonaDTO} from '../../shared/dto/zonaDTO';
import {SICA_API} from '../../app.api';



@Injectable()
export class ZonasService {

  zona: ZonaModel;

  constructor(private http: HttpClient) {}

  buscarZonas(): Observable<ZonaDTO[]> {
    return this.http.get<ZonaDTO[]>(`${SICA_API}/zona`);
  }

  incluirZona(zona: ZonaModel): Observable<ZonaModel> {
    return this.http.post<ZonaModel>(`${SICA_API}/zona`, zona)
      .pipe(tap(resultado => this.zona = zona));
  }

}
