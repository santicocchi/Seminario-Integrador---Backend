import { Module } from '@nestjs/common';
import { EstudioService } from './estudio.service';
import { EstudioController } from './estudio.controller';

@Module({
  controllers: [EstudioController],
  providers: [EstudioService],
})
export class EstudioModule {}
