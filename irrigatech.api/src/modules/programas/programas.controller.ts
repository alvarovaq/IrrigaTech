import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Put('update')
    async update(@Body() programaDto: ProgramaDto) {
        return await this.programasService.update(programaDto);
    }

    @Delete('remove/:id')
    async remove(@Param('id') id: string) {
        return await this.programasService.remove(id);
    }
}
