import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Activity } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class ActivityService {
    constructor(private http: Http) { }

    getAll(domain_id: string = null, filter: any = null): Promise<Activity[]> {
        return new Promise<Activity[]>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + environment.API_TOKEN;

            if (filter)
                query += '&filter=' + JSON.stringify(filter);
                
            this.http.get(environment.API_ENDPOINT + '/get_activities?' + query).map(res => res.json())
                .subscribe(arr => resolve(<any[]> arr), err => reject(err.message));
        });
    }

    getById(auid: string, domain_id: string): Promise<Activity> {
        return new Promise<Activity>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&auid=' + auid + '&token=' + environment.API_TOKEN;
            this.http.get(environment.API_ENDPOINT + '/get_activity?' + query).map(res => res.json())
                .subscribe(u => resolve(<Activity> u), err => reject(err.message));
        });
    }
}
