import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Activity } from '../models/index';
import { AppSettings } from '../app.settings';

@Injectable()
export class ActivityService {
    constructor(private http: Http) { }

    getAll(domain_id: string = null): Promise<Activity[]> {
        return new Promise<Activity[]>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + AppSettings.API_TOKEN;
            this.http.get(AppSettings.API_ENDPOINT + '/get_activities?' + query).map(res => res.json())
                .subscribe(arr => resolve(<any[]> arr), err => reject(err.message));
        });
    }

    getById(auid: string, domain_id: string): Promise<Activity> {
        return new Promise<Activity>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&auid=' + auid + '&token=' + AppSettings.API_TOKEN;
            this.http.get(AppSettings.API_ENDPOINT + '/get_activity?' + query).map(res => res.json())
                .subscribe(u => resolve(<Activity> u), err => reject(err.message));
        });
    }
}
