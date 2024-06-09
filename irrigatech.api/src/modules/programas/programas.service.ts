import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Programa } from './schema/programa.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramaDto } from './dto/programa.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProgramasService implements OnModuleInit {
    private programas: Programa[];
    private _init: BehaviorSubject<Programa[]>;
    private _update: BehaviorSubject<Programa | undefined>;
    private _deleted: BehaviorSubject<string>;

    constructor(
        @InjectModel('programas') private readonly programaModel: Model<Programa>
    ) {
        this._init = new BehaviorSubject<Programa[]>([]);
        this._update = new BehaviorSubject<Programa | undefined>(undefined);
        this._deleted = new BehaviorSubject<string>("");
    }

    async onModuleInit() {
        this.programas = await this.programaModel.find();
        this._init.next(this.programas);
    }

    onInit(): Observable<Programa[]> {
        return this._init.asObservable();
    }

    onUpdate(): Observable<Programa | undefined> {
        return this._update.asObservable();
    }

    onDeleted(): Observable<string> {
        return this._deleted.asObservable();
    }

    get() : Programa[]
    {
        return this.programas;
    }

    find(valvula: number)
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
        this._update.next(programa);
    }

    removePrograma(id: string) : boolean {
        const index = this.programas.findIndex((prog) => prog.id === id);
        if (index !== -1)
        {
            this.programas.splice(index, 1);
            this._deleted.next(id);
            return true;
        }
        return false;
    }
}
