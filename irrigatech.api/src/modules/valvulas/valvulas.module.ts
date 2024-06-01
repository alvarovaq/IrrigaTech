import { Module } from '@nestjs/common';
import { ValvulasService } from './valvulas.service';

@Module({
  providers: [ValvulasService],
  exports: [ValvulasService]
})
export class ValvulasModule {}
