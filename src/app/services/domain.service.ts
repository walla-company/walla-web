import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Domain } from '../models/index';
import { AppSettings } from '../app.settings';
import { environment } from '../../environments/environment';

@Injectable()
export class DomainService {
    private subject = new Subject<Domain>();

    constructor(private http: Http) { }

    getCurrentDomain() {
        return this.subject.asObservable();
    }

    setCurrentDomain(domain_id: string) {
        this.subject.next(AppSettings.setCurrentDomain(domain_id));
    }

    getAll(): Promise<Domain[]> {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        return new Promise<Domain[]>((resolve, reject) => {
            this.http.get(environment.API_ENDPOINT + '/domains?token=' + userData.token).map(res => res.json())
                .subscribe(arr => {
                    let domains: Domain[] = arr;
                    resolve(domains);
                }, err => reject(err.message));
        });
    }
}
