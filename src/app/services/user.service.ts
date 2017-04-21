import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as moment_tz from 'moment-timezone';
import * as moment from 'moment';


import { User } from '../models/index';
import { AppSettings } from '../app.settings';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(domain_id: string = null, filter: any = null, filterFn: (u: User) => boolean = null): Promise<User[]> {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        return new Promise<User[]>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + userData.token;

            if (filter)
                query += '&filter=' + JSON.stringify(filter);
                
            this.http.get(environment.API_ENDPOINT + '/get_users?' + query).map(res => res.json())
                .subscribe(oUsers => {
                    let arrUsers: User[] = [];
                    for (let k in oUsers) {
                        if (oUsers.hasOwnProperty(k) && (!filterFn || filterFn(oUsers[k]))) {
                            oUsers[k].suspended = !!oUsers[k].suspended;
                            arrUsers.push(oUsers[k]);
                        }
                    }
                    resolve(arrUsers);
                }, err => reject(err.message));
        });
    }

    getUserAnalytics(domain_id: string = null, date: Date = null, filter: any = null): Promise<any> {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        return new Promise<any>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + userData.token;

            query += '&timezone=' + moment_tz.tz.guess();

            if (date)
                query += '&date=' + moment(date).format();

            if (filter)
                query += '&filter=' + JSON.stringify(filter);
                
            this.http.get(environment.API_ENDPOINT + '/get_users_analytics?' + query).map(res => res.json())
                .subscribe(data => {

                    // grad/undergrad chart
                    if (data.grad_undergrad_chart.some(v => v)) {
                        let colors = [
                            '#F89C3F',
                            '#FACEA5'
                        ];

                        if (data.grad_undergrad_chart[0] < data.grad_undergrad_chart[1]) {
                            colors.reverse();
                        }

                        data.grad_undergrad_chart = {
                            type: 'pie',
                            data: {
                                labels: ['Graduate', 'Undergraduate'],
                                datasets: [{
                                    data: data.grad_undergrad_chart,
                                    backgroundColor: colors
                                }]
                            }
                        };
                    } else {
                        data.grad_undergrad_chart = null;
                    }

                    const getColor = biggestIndex => (v, i) => i === biggestIndex ? '#F89C3F' : '#FACEA5';
                    let biggestValue, biggestIndex;

                    // grad_year chart
                    if (data.grad_year_chart.data.length) {
                        biggestValue = Math.max.apply(null, data.grad_year_chart.data);
                        biggestIndex = data.grad_year_chart.data.indexOf(biggestValue);

                        data.grad_year_chart = {
                            type: 'bar',
                            data: {
                                labels: data.grad_year_chart.years,
                                datasets: [{
                                    label: 'Users graduating',
                                    data: data.grad_year_chart.data,
                                    backgroundColor: data.grad_year_chart.data.map(getColor(biggestIndex)),
                                    borderWidth: 1
                                }]
                            }
                        };
                    } else {
                        data.grad_year_chart = null;
                    }


                    // fields of study is already correctly formed
                    if (!data.fields_of_study_chart.length) {
                        data.fields_of_study_chart = null;
                    }


                    // sessions over time
                    const getChartData = (field) => {
                        let list = data[field];
                        if (!list || !list.length) {
                            return null;
                        }

                        const labels = list.map(o => o.label);
                        const values = list.map(o => o.count);
                        return {
                            type: 'line',
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Unique users sessions',
                                        data: values,
                                        backgroundColor: '#F89C3F',
                                        borderColor: '#F89C3F',
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: '#fff',
                                        pointBackgroundColor: '#fff',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: '#F89C3F',
                                        pointHoverBorderColor: '#fff',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 2,
                                        pointHitRadius: 10,
                                        borderCapStyle: 'butt'
                                    }
                                ]
                            },
                            options: {
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                    };

                    data.sessions_over_time_chart = {};
                    data.sessions_over_time_chart.sessions_by_day = getChartData('sessions_by_day');
                    data.sessions_over_time_chart.sessions_by_week = getChartData('sessions_by_week');
                    data.sessions_over_time_chart.sessions_by_month = getChartData('sessions_by_month');
                    data.sessions_over_time_chart.sessions_by_year = getChartData('sessions_by_year');

                    const notEmptyChart = Object.keys(data.sessions_over_time_chart)
                                                .filter(k => data.sessions_over_time_chart[k])[0];

                    if (notEmptyChart) {
                        data.sessions_over_time_chart.selected_chart = notEmptyChart;
                    } else {
                        data.sessions_over_time_chart = null;
                    }
                    
                    resolve(data);
                }, err => reject(err.message));
        });
    }
    
    // getUserInterests(uid: string, domain_id: string): Promise<any[]> {
    //     return new Promise<User[]>((resolve, reject) => {
    //         let query = 'school_identifier=' + domain_id + '&uid=' + uid + '&token=' + userData.token;
    //         this.http.get(environment.API_ENDPOINT + '/get_user_interests?' + query).map(res => res.json())
    //             .subscribe(arr => resolve(<User[]> arr), err => reject(err.message));
    //     });
    // }

    changeUserSuspension(uid: string, domain_id: string, suspended: boolean): Promise<any> {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        return new Promise<any>((resolve, reject) => {
            let obj = {
                school_identifier: domain_id,
                uid,
                suspended
            };
            let query = 'token=' + userData.token;
            this.http.post(environment.API_ENDPOINT + '/change_user_suspension?' + query, obj)
                .subscribe(u => resolve(), err => reject(err.message));
        });
    }

    getById(uid: string, domain_id: string): Promise<User> {
        let userData: any = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        return new Promise<User>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&uid=' + uid + '&token=' + userData.token;
            this.http.get(environment.API_ENDPOINT + '/get_user?' + query).map(res => res.json())
                .subscribe(u => resolve(<User> u), err => reject(err.message));
        });
    }
}
