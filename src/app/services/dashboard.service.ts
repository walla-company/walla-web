import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { Colors } from '../helpers/colors';

@Injectable()
export class DashboardService {
    constructor(private http: Http) { }

    getDashboardData(domain_id: string) {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        return new Promise<any>((resolve, reject) => {
            let query = 'token=' + userData.token;
            query += '&school_identifier=' + domain_id;

            this.http.get(environment.API_ENDPOINT + '/get_dashboard_data?' + query).map(res => res.json())
            .subscribe(data => {
                // events_avg_planning_time
                data.events_avg_planning_time = moment.duration(data.events_avg_planning_time, 'seconds').humanize();
                data.avg_session_duration = moment.duration(data.avg_session_duration, 'seconds').humanize();
                resolve(data);
            });
        });
    }
}
