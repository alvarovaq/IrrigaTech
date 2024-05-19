import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('controlador')
@Controller('controlador')
export class ControladorController {
  constructor(private readonly controladorService: ControladorService) {}

  @Get(':status')
  findAll(@Param('status') status: string) {
    return this.controladorService.setStatus(status);
  }
}
