import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('controlador')
@Controller('controlador')
export class ControladorController {
  constructor(private readonly controladorService: ControladorService) {}

  @Get('status')
  getAllStatus() {
    return this.controladorService.getAllStatus();
  }

  @Get('status/:id')
  getStatus(@Param('id') id: number) {
    return this.controladorService.getStatus(id);
  }

  @Get(':status/:id')
  findAll(@Param('status') status: string, @Param('id') id: number) {
    return this.controladorService.setStatus(id, status);
  }

}
