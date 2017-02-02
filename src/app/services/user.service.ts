import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../models/index';
import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(school_id: string = null): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            let query = 'school_identifier=' + school_id + '&token=' + AppSettings.API_TOKEN;
            this.http.get(AppSettings.API_ENDPOINT + '/get_users?' + query).map(res => res.json())
                .subscribe(arr => resolve(<User[]> arr), err => reject(err.message));
        });
    }

    getById(uid: string, school_id: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let query = 'school_identifier=' + school_id + '&uid=' + uid + '&token=' + AppSettings.API_TOKEN;
            this.http.get(AppSettings.API_ENDPOINT + '/get_user_basic_info?' + query).map(res => res.json())
                .subscribe(u => resolve(<User> u), err => reject(err.message));
        });
    }

    // create(user: User): Promise<User> {
    //     return new Promise<User>((resolve, reject) => {
    //         this.http.post(AppSettings.API_ENDPOINT + '/users', user, this.jwt()).map(res => res.json())
    //             .subscribe(u => resolve(<User> u), err => reject(err.message));
    //     });
    // }

    // update(user: User): Promise<User> {
    //     return new Promise<User>((resolve, reject) => {
    //         this.http.put(AppSettings.API_ENDPOINT + '/users/' + user.id, user, this.jwt()).map(res => res.json())
    //             .subscribe(u => resolve(<User> u), err => reject(err.message));
    //     });
    // }

    // delete(id: number): Promise<User> {
    //     return new Promise<User>((resolve, reject) => {
    //         this.http.delete(AppSettings.API_ENDPOINT + '/users/' + id, this.jwt()).map(res => res.json())
    //             .subscribe(u => resolve(<User> u), err => reject(err.message));
    //     });
    // }

    // // private helper methods

    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('userData'));
    //     console.log(currentUser);
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}
