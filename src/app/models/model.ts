import { Observable, of, Subject } from 'rxjs';

export class Model {
  public _id: number;
  public _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): number | Observable<number> {
    return this._id;
  }

  get name(): string | Observable<string>  {
    return this._name;
  }

}