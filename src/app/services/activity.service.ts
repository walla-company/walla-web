import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as moment_tz from 'moment-timezone';
import * as moment from 'moment';

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
                
            this.http.get(environment.API_ENDPOINT + '/get_all_activities?' + query).map(res => res.json())
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

    deleteActivity(auid: string, domain_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = 'token=' + environment.API_TOKEN;
            this.http.post(environment.API_ENDPOINT + '/delete_activity?' + query, {
                auid,
                school_identifier: domain_id,
                uid: 1
            }).subscribe(u => resolve(), err => reject(err.message));
        });
    }

    getActivityAnalytics(domain_id: string = null, date: Date = null, filter: any = null): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = 'school_identifier=' + domain_id + '&token=' + environment.API_TOKEN;

            query += '&timezone=' + moment_tz.tz.guess();

            if (date)
                query += '&date=' + moment(date).format();

            if (filter)
                query += '&filter=' + JSON.stringify(filter);
                
            this.http.get(environment.API_ENDPOINT + '/get_activities_analytics?' + query).map(res => res.json())
                .subscribe(data => {

                    // free food events chart
                    if (data.free_food_events_chart.some(v => v)) {
                        let colors = [
                            '#F89C3F',
                            '#FACEA5'
                        ];

                        if (data.free_food_events_chart[0] < data.free_food_events_chart[1]) {
                            colors.reverse();
                        }

                        data.free_food_events_chart = {
                            type: 'pie',
                            data: {
                                labels: ['Free Food Events', 'Other Events'],
                                datasets: [{
                                    data: data.free_food_events_chart,
                                    backgroundColor: colors
                                }]
                            }
                        };
                    } else {
                        data.free_food_events_chart = null;
                    }

                    // grad/undergrad chart
                    if (data.events_by_audience.grad_undergrad_chart.some(v => v)) {
                        let colors = [
                            '#F89C3F',
                            '#FACEA5'
                        ];

                        if (data.events_by_audience.grad_undergrad_chart[0] < data.events_by_audience.grad_undergrad_chart[1]) {
                            colors.reverse();
                        }

                        data.events_by_audience.grad_undergrad_chart = {
                            type: 'pie',
                            data: {
                                labels: ['Graduate', 'Undergraduate'],
                                datasets: [{
                                    data: data.events_by_audience.grad_undergrad_chart,
                                    backgroundColor: colors
                                }]
                            }
                        };
                    } else {
                        data.events_by_audience.grad_undergrad_chart = null;
                    }

                    const getColor = biggestIndex => (v, i) => i === biggestIndex ? '#F89C3F' : '#FACEA5';
                    let biggestValue, biggestIndex;

                    // grad_year chart
                    if (data.events_by_audience.grad_year_chart.data.length) {
                        biggestValue = Math.max.apply(null, data.events_by_audience.grad_year_chart.data);
                        biggestIndex = data.events_by_audience.grad_year_chart.data.indexOf(biggestValue);

                        data.events_by_audience.grad_year_chart = {
                            type: 'bar',
                            data: {
                                labels: data.events_by_audience.grad_year_chart.years,
                                datasets: [{
                                    label: 'Users graduating',
                                    data: data.events_by_audience.grad_year_chart.data,
                                    backgroundColor: data.events_by_audience.grad_year_chart.data.map(getColor(biggestIndex)),
                                    borderWidth: 1
                                }]
                            }
                        };
                    } else {
                        data.events_by_audience.grad_year_chart = null;
                    }


                    // fields of study is already correctly formed
                    if (!data.events_by_audience.fields_of_study_chart.length) {
                        data.events_by_audience.fields_of_study_chart = null;
                    }


                    // sessions over time
                    const getChartData = (list) => {
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
                                        label: 'Events posted',
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

                    const setSelectedChart = (obj) => {
                        const notEmptyChart = Object.keys(obj).filter(k => obj[k])[0];

                        if (notEmptyChart) {
                            return obj.selected_chart = notEmptyChart;
                        } else {
                            return null;
                        }
                    };

                    data.event_posting_over_time = {};
                    data.event_posting_over_time.events_by_day = getChartData(data.events_posting_over_time.by_day);
                    data.event_posting_over_time.events_by_week = getChartData(data.events_posting_over_time.by_week);
                    data.event_posting_over_time.events_by_month = getChartData(data.events_posting_over_time.by_month);
                    data.event_posting_over_time.events_by_year = getChartData(data.events_posting_over_time.by_year);

                    data.event_time_over_time = {};
                    data.event_time_over_time.events_by_day = getChartData(data.events_time_over_time.by_day);
                    data.event_time_over_time.events_by_week = getChartData(data.events_time_over_time.by_week);
                    data.event_time_over_time.events_by_month = getChartData(data.events_time_over_time.by_month);
                    data.event_time_over_time.events_by_year = getChartData(data.events_time_over_time.by_year);

                    data.event_attendance_over_time = {};
                    data.event_attendance_over_time.events_by_day = getChartData(data.events_attendance_over_time.by_day);
                    data.event_attendance_over_time.events_by_week = getChartData(data.events_attendance_over_time.by_week);
                    data.event_attendance_over_time.events_by_month = getChartData(data.events_attendance_over_time.by_month);
                    data.event_attendance_over_time.events_by_year = getChartData(data.events_attendance_over_time.by_year);
                        


                    if (!setSelectedChart(data.event_posting_over_time))
                        data.event_posting_over_time = null;

                    if (!setSelectedChart(data.event_time_over_time))
                        data.event_time_over_time = null;

                    if (!setSelectedChart(data.event_attendance_over_time))
                        data.event_attendance_over_time = null;
                        
                    resolve(data);
                }, err => reject(err.message));
        });
    }
}
