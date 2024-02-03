import { Injectable } from '@nestjs/common';
import { HealthStatusEnum } from './common/enums';
import { IHealthResponse } from './common/interfaces';

@Injectable()
export class AppService {
  getHello(): string {
    return 'HI!';
  }

  healthCheck(): IHealthResponse {
    return { status: HealthStatusEnum.OK };
  }
}
