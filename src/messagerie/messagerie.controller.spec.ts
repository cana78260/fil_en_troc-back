import { Test, TestingModule } from '@nestjs/testing';
import { MessagerieController } from './messagerie.controller';
import { MessagerieService } from './messagerie.service';

describe('MessagerieController', () => {
  let controller: MessagerieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagerieController],
      providers: [MessagerieService],
    }).compile();

    controller = module.get<MessagerieController>(MessagerieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
