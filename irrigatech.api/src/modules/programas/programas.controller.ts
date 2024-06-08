import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgramasService } from './programas.service';
import { ProgramaDto } from './dto/programa.dto';

@ApiTags('programas')
@Controller('programas')
export class ProgramasController {
    constructor(private readonly programasService: ProgramasService) {}

    @Get('find/:valvula')
    async find(@Param('valvula') valvula: number) {
        return await this.programasService.find(valvula);
    }

    @Post('create')
    async create(@Body() programaDto: ProgramaDto) {
        return await this.programasService.create(programaDto);
    }
}
