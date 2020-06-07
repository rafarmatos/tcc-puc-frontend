import {EnvolvidoDTO} from './envolvidoDTO';
import {SensorDTO} from './sensorDTO';

class ZonaDTO {
  envolvidos: EnvolvidoDTO[];
  idZona: number;
  nomeZona: string;
  sensores: SensorDTO[];
}

export {ZonaDTO};
