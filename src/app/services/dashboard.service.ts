import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { DashboardData } from '../models/index';
import { AppSettings } from '../app.settings';
import { Colors } from '../helpers/colors';

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




    // charts related

    getGradUndergradChartData(domain_id: string = null, group_id: string = null): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            if (domain_id) {
                query += '&school_identifier=' + domain_id;
                if (group_id) {
                    query += '&guid=' + domain_id;
                }
            }

            this.http.get(AppSettings.API_ENDPOINT + '/get_grad_undergrad_chart_data?' + query).map(res => res.json())
                .subscribe(data => {
                    let colors = [
                        '#F89C3F',
                        '#FACEA5'
                    ];
                    if (data[0] < data[1]) {
                        colors.reverse();
                    }
                    resolve({
                        type: 'pie',
                        data: {
                            labels: ['Graduate', 'Undergraduate'],
                            datasets: [{
                                data,
                                backgroundColor: colors
                            }]
                        },
                        options: { maintainAspectRatio: false }
                    });
                }, err => reject(err.message));
        });
    }

    getGradYearChartData(domain_id: string = null, group_id: string = null): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = 'token=' + AppSettings.API_TOKEN;
            if (domain_id) {
                query += '&school_identifier=' + domain_id;
                if (group_id) {
                    query += '&guid=' + domain_id;
                }
            }

            this.http.get(AppSettings.API_ENDPOINT + '/get_grad_year_chart_data?' + query).map(res => res.json())
                .subscribe(chartData => {
                    let biggestIndex = chartData.data.indexOf(Math.max.apply(null, chartData.data));
                    let colors = chartData.data.map((v, i) => i === biggestIndex ? '#F89C3F' : '#FACEA5');
                    resolve({
                        type: 'bar',
                        data: {
                            labels: chartData.years,
                            datasets: [{
                                label: 'Users graduating',
                                data: chartData.data,
                                backgroundColor: colors,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            maintainAspectRatio: false
                        }
                    });
                }, err => reject(err.message));
        });
    }
}
