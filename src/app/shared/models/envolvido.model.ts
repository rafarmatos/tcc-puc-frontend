class EnvolvidoModel {

  private _categoria: string;
  private _email: string;
  private _idZona: number;


  constructor(categoria?: string, email?: string, idZona?: number) {
    this._categoria = categoria;
    this._email = email;
    this._idZona = idZona;
  }


  get categoria(): string {
    return this._categoria;
  }

  set categoria(value: string) {
    this._categoria = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get idZona(): number {
    return this._idZona;
  }

  set idZona(value: number) {
    this._idZona = value;
  }
}

export {EnvolvidoModel};

