import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tareas')
@Controller('tareas')
export class TareasController {}
