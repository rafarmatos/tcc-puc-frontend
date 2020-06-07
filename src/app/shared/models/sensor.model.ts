class SensorModel {

  private _idZona: number;
  private _localizacao: string;
  private _nomeSensor: string;


  constructor(idZona?: number, localizacao?: string, nomeSensor?: string) {
    this._idZona = idZona;
    this._localizacao = localizacao;
    this._nomeSensor = nomeSensor;
  }


  get idZona(): number {
    return this._idZona;
  }

  set idZona(value: number) {
    this._idZona = value;
  }

  get localizacao(): string {
    return this._localizacao;
  }

  set localizacao(value: string) {
    this._localizacao = value;
  }

  get nomeSensor(): string {
    return this._nomeSensor;
  }

  set nomeSensor(value: string) {
    this._nomeSensor = value;
  }
}


export {SensorModel};

