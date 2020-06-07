class ZonaModel {
  private _nomeZona: number;


  constructor(nomeZona?: number) {
    this._nomeZona = nomeZona;
  }

  get nomeZona(): number {
    return this._nomeZona;
  }

  set nomeZona(value: number) {
    this._nomeZona = value;
  }
}



export {ZonaModel};
