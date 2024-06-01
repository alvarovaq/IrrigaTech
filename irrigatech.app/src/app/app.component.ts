import { Component, OnInit } from '@angular/core';
import { ControladorService } from './core/services/controlador.service';
import { ValvulasService } from './core/services/valvulas.service';
import { ReceiverService } from './core/services/receiver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  status: boolean = false;

  constructor () {}

  ngOnInit(): void {}
  
}
