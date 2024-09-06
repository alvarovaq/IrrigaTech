import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseModel } from '../models/auth-response.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { RouterService } from './router.service';
import { AuthRequestModel } from '../models/auth-request.model';
import { environment } from 'src/environments/environment';
import { UserModel } from '@core/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userLogged = new BehaviorSubject<UserModel | null>(null);
    public user$: Observable<UserModel | null> = this.userLogged;

    constructor (
        private readonly http: HttpClient,
        private readonly routerService: RouterService
    ) {}

    getNewToken (user: AuthRequestModel): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(`${environment.apiUrl}/api/auth/login`, user);
    }

    getUser (): Observable<UserModel> {
        return this.http.get<UserModel>(`${environment.apiUrl}/api/auth/user/${this.login}`);
    }

    setSession (): void {
        this.getUser()
        .subscribe(res => {
            const myUser = this.userLogged.getValue();
            if (!myUser && this.isLogin())
                this.userLogged.next(res);
        }, err => {
            console.log(err);
        })
    }

    authenticate (authResponse: AuthResponseModel): void {
        this.setToken(authResponse.token);
        this.setLogin(authResponse.user.login);
        this.routerService.goToHome();
        this.setSession();
    }

    logout (): void {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        this.routerService.goToLogin();
        this.userLogged.next(null);
    }

    isLogin (): boolean {
        if (this.token) return true;
        return false;
    }

    get token (): string | null {
        return localStorage.getItem('token');
    }
    
    setToken (token: string): void {
        localStorage.setItem('token', token);
    }

    get login (): string | null {
        return localStorage.getItem('login');
    }

    setLogin (login: string): void {
        localStorage.setItem('login', login);
    }
}