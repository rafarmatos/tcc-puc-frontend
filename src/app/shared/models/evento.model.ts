class EventoModel {

  private _data: string;
  private _evento: string;
  private _intensidade: number;
  private _sensor: number;


  constructor(data: string, evento: string, intensidade: number, sensor: number) {
    this._data = data;
    this._evento = evento;
    this._intensidade = intensidade;
    this._sensor = sensor;
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }

  get evento(): string {
    return this._evento;
  }

  set evento(value: string) {
    this._evento = value;
  }

  get intensidade(): number {
    return this._intensidade;
  }

  set intensidade(value: number) {
    this._intensidade = value;
  }

  get sensor(): number {
    return this._sensor;
  }

  set sensor(value: number) {
    this._sensor = value;
  }
}

export {EventoModel};

