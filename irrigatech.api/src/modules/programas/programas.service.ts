import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Programa } from './schema/programa.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramaDto } from './dto/programa.dto';

@Injectable()
export class ProgramasService implements OnModuleInit {
    private programas: Programa[];

    constructor(
        @InjectModel('programas') private readonly programaModel: Model<Programa>
    ) {}

    async onModuleInit() {
        this.programas = await this.programaModel.find();
    }

    async find(valvula: number)
    {
        return this.programas.filter((prog) => prog.valvula === valvula) || [];
    }

    async create(programaDto: ProgramaDto)
    {
        delete programaDto.id;
        const prog = await this.programaModel.create(programaDto);
        this.updatePrograma(prog);
        return prog;
    }

    async update(programaDto: ProgramaDto)
    {
        const updateProg = await this.programaModel.findOneAndUpdate({ id: programaDto.id }, programaDto, { new: true });
        if (!updateProg)
            throw new NotFoundException('No se ha podido encontrar el programa');
        else
            this.updatePrograma(updateProg);
        return updateProg;
    }

    async remove(id: string)
    {
        const remProg = await this.programaModel.findOneAndDelete({ id });
        if (!remProg)
            throw new NotFoundException('No se ha podido encontrar el programa');
        else
            this.removePrograma(id);
        return remProg;
    }

    updatePrograma(programa: Programa) : void {
        const index = this.programas.findIndex((prog) => prog.id === programa.id);
        if (index !== -1)
            this.programas[index] = programa;
        else
            this.programas.push(programa);
    }

    removePrograma(id: string) : boolean {
        const index = this.programas.findIndex((prog) => prog.id === id);
        if (index !== -1)
        {
            this.programas.splice(index, 1);
            return true;
        }
        return false;
    }
}
