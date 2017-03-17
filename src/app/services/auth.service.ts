import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    redirectUrl: string;
    private loggedIn: boolean = false;

    constructor (private http: Http) {
        this.loggedIn = !!localStorage.getItem('userData');
    }

    login (user: User): Promise<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let jsonData = JSON.stringify(user);
        return new Promise<User>((resolve, reject) => {
            this.http.post(environment.API_ENDPOINT + '/token', jsonData, { headers })
                    .subscribe(res => {
                        let data = res.json();
                        if (data && data.token) {
                            localStorage.setItem('userData', JSON.stringify(data));
                            this.loggedIn = true;
                        }
                        resolve(data);
                    }, res => reject(res.text()));
        });
    }

    logOut (): void {
        localStorage.removeItem('userData');
        this.loggedIn = false;
    }

    isLoggedIn (): boolean {
        return this.loggedIn;
    }
}
