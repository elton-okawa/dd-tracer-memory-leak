import { Injectable, Scope } from '@nestjs/common';
import { DataRepository } from './data.repository';
import { OtherService } from './other.service';

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(
    private _dataRepository: DataRepository,
    private _otherService: OtherService,
  ) {}

  getHello() {
    const data = this._dataRepository.getData();
    this._otherService.init(data);

    if (process.env.RELEASE_DATA === 'true') {
      this._otherService.release();
    }

    return data;
  }
}
