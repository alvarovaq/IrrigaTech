import { Injectable } from '@nestjs/common';
import { Programa } from './schema/programa.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramaDto } from './dto/programa.dto';

@Injectable()
export class ProgramasService {

    constructor(
        @InjectModel('programas') private readonly programaModel: Model<Programa>
    ) {}

    async find(valvula: number)
    {
        return await this.programaModel.find({ valvula });
    }

    async create(programaDto: ProgramaDto)
    {
        delete programaDto.id;
        const prog = await this.programaModel.create(programaDto);
        return prog;
    }

}
