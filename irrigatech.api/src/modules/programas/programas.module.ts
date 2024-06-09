import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSchema } from './schema/programa.schema';
import { CrontabService } from './crontab.service';
import { TareasModule } from '../tareas/tareas.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'programas',
        schema: ProgramaSchema
      }
    ]),
    TareasModule
  ],
  controllers: [ProgramasController],
  providers: [ProgramasService, CrontabService]
})
export class ProgramasModule {}
