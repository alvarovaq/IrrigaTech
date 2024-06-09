import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSchema } from './schema/programa.schema';
import { CrontabService } from './crontab.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'programas',
        schema: ProgramaSchema
      }
    ])
  ],
  controllers: [ProgramasController],
  providers: [ProgramasService, CrontabService]
})
export class ProgramasModule {}
