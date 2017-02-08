import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Domain } from '../models/index';
import { AppSettings } from '../app.settings';

@Injectable()
export class DomainService {
    private subject = new Subject<Domain>();

    constructor(private http: Http) { }

    getCurrentDomain() {
        return this.subject.asObservable();
    }

    setCurrentDomain(domain_id: string) {
        AppSettings.setCurrentDomain(domain_id);
        this.subject.next();
    }

    getAll(): Promise<Domain[]> {
        return new Promise<Domain[]>((resolve, reject) => {
            this.http.get(AppSettings.API_ENDPOINT + '/domains?token=' + AppSettings.API_TOKEN).map(res => res.json())
                .subscribe(arr => {
                    let domains: Domain[] = arr;
                    resolve(domains);
                }, err => reject(err.message));
        });
    }
}
