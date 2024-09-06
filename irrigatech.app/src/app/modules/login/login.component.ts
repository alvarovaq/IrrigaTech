import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequestModel } from '@core/models/auth-request.model';
import { AuthService } from '@core/services/auth.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;

    constructor(
      private readonly fb: FormBuilder,
      private readonly authService: AuthService,
      private readonly sanckerServie: SnackerService
    ) {}
  
    get login (): string {
      return this.form.value.login
    }
  
    get password (): string {
      return this.form.value.password;
    }
  
    ngOnInit(): void {
      this.form = this.fb.group({
        login: ['', [Validators.required]],
        password: ['', Validators.required],
      });
    }
  
    authenticate (): void {
        this.loading = true;
        const user: AuthRequestModel = this.getAuthRequest();
        this.authService.getNewToken(user)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
            res => {
              this.loading = true;
              this.authService.authenticate(res);
            },
            err => {
              this.sanckerServie.showError(err.error.message);
              console.log(err);
            }
        );
    }

    private getAuthRequest (): AuthRequestModel {
        return {
            login: this.login,
            password: this.password
        };
    }
}
