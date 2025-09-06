import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class OtherService {
  private _data: Record<string, any>;

  init(data: Record<string, any>) {
    this._data = data;
  }
}
