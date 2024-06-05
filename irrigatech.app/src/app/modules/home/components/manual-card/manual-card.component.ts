import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Valvula } from '@core/interfaces/valvula.interface';
import { ControladorService } from '@core/services/controlador.service';

@Component({
  selector: 'app-manual-card',
  templateUrl: './manual-card.component.html',
  styleUrls: ['./manual-card.component.css']
})
export class ManualCardComponent implements OnChanges {
  @Input() valvula: Valvula;
  loading: boolean = false;

  constructor(
    private readonly controladorService: ControladorService
  ) {
    this.valvula = {
      id: 0,
      open: false,
      date: new Date()
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loading && changes["valvula"])
      this.loading = this.valvula.open != changes["valvula"].currentValue.open;
  }

  setStatus(id: number, status : boolean) : void
  {
    this.loading = true;
    this.controladorService.setStatus(id, status)
    .subscribe(
      res => {
        setTimeout(() => {
          this.loading = false;
        }, 7000);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
