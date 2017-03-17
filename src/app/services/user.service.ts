import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../models/index';
import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(domain_id: string = null, filterFn: (u: User) => boolean = null): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + AppSettings.API_TOKEN;
            // let filter = {
            //     academic_level: '=grad',
            //     graduation_year: '=2017'
            // };
            // query += '&filter=' + JSON.stringify(filter);
            this.http.get(AppSettings.API_ENDPOINT + '/get_users?' + query).map(res => res.json())
                .subscribe(oUsers => {
                    let arrUsers: User[] = [];
                    for (let k in oUsers) {
                        if (oUsers.hasOwnProperty(k) && (!filterFn || filterFn(oUsers[k]))) {
                            arrUsers.push(oUsers[k]);
                        }
                    }
                    resolve(arrUsers);
                }, err => reject(err.message));
        });
    }

    // getUserInterests(uid: string, domain_id: string): Promise<any[]> {
    //     return new Promise<User[]>((resolve, reject) => {
    //         let query = 'school_identifier=' + domain_id + '&uid=' + uid + '&token=' + AppSettings.API_TOKEN;
    //         this.http.get(AppSettings.API_ENDPOINT + '/get_user_interests?' + query).map(res => res.json())
    //             .subscribe(arr => resolve(<User[]> arr), err => reject(err.message));
    //     });
    // }

    getById(uid: string, domain_id: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&uid=' + uid + '&token=' + AppSettings.API_TOKEN;
            this.http.get(AppSettings.API_ENDPOINT + '/get_user?' + query).map(res => res.json())
                .subscribe(u => resolve(<User> u), err => reject(err.message));
        });
    }

    updateFirstName(uid: string, domain_id: string, first_name: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_first_name?' + query, {
                school_identifier: domain_id, uid, first_name
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateLastName(uid: string, domain_id: string, last_name: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_last_name?' + query, {
                school_identifier: domain_id, uid, last_name
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateEmail(uid: string, domain_id: string, email: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_email?' + query, {
                school_identifier: domain_id, uid, email
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateAcademicLevel(uid: string, domain_id: string, academic_level: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_academic_level?' + query, {
                school_identifier: domain_id, uid, academic_level
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateMajor(uid: string, domain_id: string, major: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_major?' + query, {
                school_identifier: domain_id, uid, major
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateGraduationYear(uid: string, domain_id: string, graduation_year: number) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_graduation_year?' + query, {
                school_identifier: domain_id, uid, graduation_year
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateHometown(uid: string, domain_id: string, hometown: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_hometown?' + query, {
                school_identifier: domain_id, uid, hometown
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateDescription(uid: string, domain_id: string, description: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_description?' + query, {
                school_identifier: domain_id, uid, description
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateProfileImageUrl(uid: string, domain_id: string, profile_image_url: string) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_profile_image_url?' + query, {
                school_identifier: domain_id, uid, profile_image_url
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    updateLastLogon(uid: string, domain_id: string, last_logon: Date = new Date()) {
        return new Promise<User>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            this.http.post(AppSettings.API_ENDPOINT + '/update_user_last_logon?' + query, {
                school_identifier: domain_id, uid, last_logon: last_logon.getTime() / 1000
            }).subscribe(u => resolve(), err => reject(err.message));
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
