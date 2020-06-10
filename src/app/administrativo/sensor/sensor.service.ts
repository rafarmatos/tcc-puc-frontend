import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {SensorModel} from '../../shared/models/sensor.model';
import {SensorDTO} from '../../shared/dto/sensorDTO';
import {SICA_API} from '../../app.api';
import {ZonaDTO} from '../../shared/dto/zonaDTO';



@Injectable()
export class SensoresService {

  sensor: SensorModel;

  constructor(private http: HttpClient) {}

  buscarSensores(): Observable<SensorDTO[]> {
    return this.http.get<SensorDTO[]>(`${SICA_API}/sensor`);
  }

  incluirSensor(sensor: SensorModel): Observable<SensorModel> {
    console.log('teste');
    return this.http.post<SensorModel>(`${SICA_API}/sensor`, sensor)
      .pipe(tap(resultado => this.sensor = sensor));
  }

  buscarZonas(): Observable<ZonaDTO[]> {
    return this.http.get<ZonaDTO[]>(`${SICA_API}/zona`);
  }

  excluirSensorPorId(idSensor: string): Observable<any> {
    return this.http.delete(`${SICA_API}/sensor/${idSensor}`);
  }

}
