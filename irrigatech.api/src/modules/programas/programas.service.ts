import { Injectable, NotFoundException } from '@nestjs/common';
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
        const prog = await this.programaModel.find({ valvula });
        if (!prog) throw new NotFoundException('No se ha podido encontrar el programa');
        return prog;
    }

    async create(programaDto: ProgramaDto)
    {
        delete programaDto.id;
        const prog = await this.programaModel.create(programaDto);
        return prog;
    }

    async update(programaDto: ProgramaDto)
    {
        const updateProg = await this.programaModel.findOneAndUpdate({ id: programaDto.id }, programaDto, { new: true });
        if (!updateProg) throw new NotFoundException('No se ha podido encontrar el programa');
        return updateProg;
    }

    async remove(id: string)
    {
        const remProg = await this.programaModel.findOneAndDelete({ id });
        if (!remProg) throw new NotFoundException('No se ha podido encontrar el programa');
        return remProg;
    }
}
