import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { AppService } from './app.service';
import { IHealthResponse } from './common/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiExcludeEndpoint()
  @Get('/health')
  health(): IHealthResponse {
    return this.appService.healthCheck();
  }
}
