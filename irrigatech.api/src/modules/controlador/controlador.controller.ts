import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('controlador')
@UseGuards(JwtAuthGuard)
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
