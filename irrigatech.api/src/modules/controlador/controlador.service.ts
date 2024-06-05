import { Injectable } from '@nestjs/common';
import { ValvulasService } from '../valvulas/valvulas.service';
import { Valvula } from 'src/interfaces/valvula.interface';
import { ConnectorService } from '../mqtt/connector.service';

@Injectable()
export class ControladorService {

  constructor (
    private readonly connectorService: ConnectorService,
    private readonly valvulasService: ValvulasService
  ) {}

  setStatus(id: number, status: string) : boolean {
    if (status == 'ON' || status == 'OFF')
    {
      this.connectorService.send(id, status == 'ON');
      return true;
    }
    
    return false;
  }

  getAllStatus() : Valvula[] {
    const valvulas = this.valvulasService.get();
    return valvulas;
  }

  getStatus(id: number) : Valvula | undefined {
    const valvula = this.valvulasService.find(id);
    return valvula;
  }
}
