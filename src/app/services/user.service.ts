import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            this.http.get('/api/users', this.jwt()).map(res => res.json())
                .subscribe(arr => {
                    let users: User[] = arr.map(u => new User(u));
                    resolve(users);
                }, err => reject(err.message));
        });
    }

    getById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.http.get('/api/users/' + id, this.jwt()).map(res => res.json())
                .subscribe(u => resolve(new User(u)), err => reject(err.message));
        });
    }

    create(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.http.post('/api/users', user, this.jwt()).map(res => res.json())
                .subscribe(u => resolve(new User(u)), err => reject(err.message));
        });
    }

    update(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.http.put('/api/users/' + user.id, user, this.jwt()).map(res => res.json())
                .subscribe(u => resolve(new User(u)), err => reject(err.message));
        });
    }

    delete(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.http.delete('/api/users/' + id, this.jwt()).map(res => res.json())
                .subscribe(u => resolve(new User(u)), err => reject(err.message));
        });
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('userData'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
