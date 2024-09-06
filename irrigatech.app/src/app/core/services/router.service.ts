import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  async goToLogin(): Promise<void> {
    await this.router.navigate(['login']);
  }

  async goToHome(): Promise<void> {
    await this.router.navigate(['']);
  }

}