import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ValvulasModule } from '../valvulas/valvulas.module';

@Module({
  imports: [ValvulasModule],
  providers: [SocketService]
})
export class SocketModule {}
