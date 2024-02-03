import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthStatusEnum } from './common/enums';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('root should return "HI!"', () => {
      expect(appController.getHello()).toBe('HI!');
    });

    it('health should return status OK', () => {
      expect(appController.health()).toEqual({ status: HealthStatusEnum.OK });
    });
  });
});
