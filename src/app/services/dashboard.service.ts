import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { DashboardData } from '../models/index';
import { AppSettings } from '../app.settings';

@Injectable()
export class DashboardService {
    constructor(private http: Http) { }

    getDashboardData(domain_id: string): Promise<DashboardData> {
        return new Promise<DashboardData>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + AppSettings.API_TOKEN;
            this.http.get(AppSettings.API_ENDPOINT + '/get_dashboard_data?' + query).map(res => res.json())
                .subscribe(arr => resolve(<DashboardData> arr), err => reject(err.message));
        });
    }
}
