import { Module } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSchema } from './schema/programa.schema';

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
  providers: [ProgramasService]
})
export class ProgramasModule {}
