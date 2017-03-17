import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Colors } from '../helpers/colors';

@Injectable()
export class DashboardService {
    constructor(private http: Http) { }

    getDashboardUsersData(domain_id: string, group_id: string = null, date: Date = null): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = 'token=' + environment.API_TOKEN;
            query += '&school_identifier=' + domain_id;
            if (group_id) {
                query += '&guid=' + group_id;
            }
            if (date) {
                query += '&date=' + date.toISOString();
            }

            this.http.get(environment.API_ENDPOINT + '/get_dashboard_users_data?' + query).map(res => res.json())
                .subscribe(data => {

                    // avg_session_duration
                    data.avg_session_duration = moment.duration(data.avg_session_duration, 'seconds').humanize();

                    // grad/undergrad chart
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

                    const getColor = biggestIndex => (v, i) => i === biggestIndex ? '#F89C3F' : '#FACEA5';

                    // grad_year chart
                    let biggestValue = Math.max.apply(null, data.grad_year_chart.data);
                    let biggestIndex = data.grad_year_chart.data.indexOf(biggestValue);

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

                    // self reported interests
                    biggestValue = Math.max.apply(null, data.self_reported_interests_chart.data);
                    biggestIndex = data.self_reported_interests_chart.data.indexOf(biggestValue);

                    data.self_reported_interests_chart = {
                        type: 'bar',
                        data: {
                            labels: data.self_reported_interests_chart.interests,
                            datasets: [{
                                label: 'Users interested',
                                data: data.self_reported_interests_chart.data,
                                backgroundColor: data.self_reported_interests_chart.data.map(getColor(biggestIndex)),
                                borderWidth: 1
                            }]
                        }
                    };


                    // fields of study is already correctly formed


                    // sessions over time
                    const getChartData = (field) => {
                        let list = data[field];
                        if (!list || !list.length) {
                            return null;
                        }

                        const labelSpace = Math.round(list.length / 3);
                        const labels = list.map((o, i) => {
                            return o.label;
                            // if (i === 0 || i === list.length - 1 || i === labelSpace || i === list.length - 1 - labelSpace) {
                            //     return o.label;
                            // }
                            // return '';
                        });
                        const values = list.map(o => o.count);
                        return {
                            a: field,
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
                            }
                        };
                    };

                    data.sessions_over_time_chart = {};
                    data.sessions_over_time_chart.sessions_by_day = getChartData('sessions_by_day');
                    data.sessions_over_time_chart.sessions_by_week = getChartData('sessions_by_week');
                    data.sessions_over_time_chart.sessions_by_month = getChartData('sessions_by_month');
                    data.sessions_over_time_chart.sessions_by_year = getChartData('sessions_by_year');

                    resolve(data);

                }, err => reject(err.message));
        });
    }

    getDashboardEventsData(domain_id: string, date: Date = null): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = 'token=' + environment.API_TOKEN;
            query += '&school_identifier=' + domain_id;
            if (date) {
                query += '&date=' + date.toISOString();
            }

            this.http.get(environment.API_ENDPOINT + '/get_dashboard_events_data?' + query).map(res => res.json())
                .subscribe(data => {

                    // events_avg_planning_time
                    data.events_avg_planning_time = moment.duration(data.events_avg_planning_time, 'seconds').humanize();

                    // free food events chart

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

                    // event interests

                    // const getColor = biggestIndex => (v, i) => i === biggestIndex ? '#F89C3F' : '#FACEA5';
                    // let biggestValue = Math.max.apply(null, data.events_by_interests_chart.data);
                    // let biggestIndex = data.events_by_interests_chart.data.indexOf(biggestValue);

                    // data.events_by_interests_chart = {
                    //     type: 'bar',
                    //     data: {
                    //         labels: data.events_by_interests_chart.interests,
                    //         datasets: [{
                    //             label: 'Events interested',
                    //             data: data.events_by_interests_chart.data,
                    //             backgroundColor: data.events_by_interests_chart.data.map(getColor(biggestIndex)),
                    //             borderWidth: 1
                    //         }]
                    //     }
                    // };

                    // events by audience

                    // grad/undergrad chart
                    let colors_audience = [
                        '#F89C3F',
                        '#FACEA5'
                    ];

                    if (data.events_by_audience.grad_undergrad_chart[0] < data.events_by_audience.grad_undergrad_chart[1]) {
                        colors_audience.reverse();
                    }

                    data.events_by_audience.grad_undergrad_chart = {
                        type: 'pie',
                        data: {
                            labels: ['Graduate', 'Undergraduate'],
                            datasets: [{
                                data: data.events_by_audience.grad_undergrad_chart,
                                backgroundColor: colors_audience
                            }]
                        }
                    };

                    const getColor = biggestIndex => (v, i) => i === biggestIndex ? '#F89C3F' : '#FACEA5';

                    // grad_year chart
                    let biggestValue = Math.max.apply(null, data.events_by_audience.grad_year_chart.data);
                    let biggestIndex = data.events_by_audience.grad_year_chart.data.indexOf(biggestValue);

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

                    // fields of study is already correctly formed

                    // event posting over time

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
                            }
                        };
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

                    resolve(data);

                }, err => reject(err.message));
        });
    }
}
