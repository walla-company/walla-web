import { Component, OnInit, NgZone } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { DomainService, DashboardService, AlertService, GroupService } from '../../services/index';
import { Group } from '../../models/index';
import { AppSettings } from '../../app.settings';
import * as moment from 'moment';

declare var jQuery;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private currentDomain: string;

    // group selection
    private selectedGroup: Group;
    private groupsMaxResults: number = 15;
    private groups: Group[] = [];

    // date selection
    private selected_date: IMyDateModel;
    private date_options: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        width: '100%'
    };

    // tabs data
    private selectedTab: string = 'users';
    private tabs_data: any = {};

    // sessions over time charts
    private over_time_charts = [
        {
            label: 'Day',
            field: 'sessions_by_day'
        },
        {
            label: 'Week',
            field: 'sessions_by_week'
        },
        {
            label: 'Month',
            field: 'sessions_by_month'
        },
        {
            label: 'Year',
            field: 'sessions_by_year'
        }
    ];

    // events over time charts
    private events_over_time_charts = [
        {
            label: 'Day',
            field: 'events_by_day'
        },
        {
            label: 'Week',
            field: 'events_by_week'
        },
        {
            label: 'Month',
            field: 'events_by_month'
        },
        {
            label: 'Year',
            field: 'events_by_year'
        }
    ];


    constructor (private domainService: DomainService,
                 private dashboardService: DashboardService,
                 private alertService: AlertService,
                 private groupService: GroupService,
                 private zone: NgZone) {

        // set start date range
        // todo: keep selected date when change tap or set to default everytime?
        const today = moment().subtract(2, 'months').add(4, 'days');
        this.selected_date = <IMyDateModel>{
            date: {
                year: today.year(),
                month: today.month() + 1,
                day: today.date()
            },
            jsdate: today.toDate()
        };
        console.log(this.selected_date);

        this.currentDomain = AppSettings.getCurrentDomain();
        this.groupService.getAll(this.currentDomain).then(groups => this.groups = groups);
        this.loadTab();
        this.setAutoComplete();
    }

    onDateChanged(event: IMyDateModel) {
        this.selected_date = event;
        this.loadTab();
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(domain => {
            this.currentDomain = domain.id;
            this.loadTab();
        });
    }

    reloadPage() {
        window.location.reload();
    }

    loadTab(tab: string = null): Promise<any> {
        this.tabs_data = {};
        if (tab) {
            this.selectedTab = tab;
        }
        return new Promise<any>((resolve, reject) => {
            ({
                users: () => {
                    let groupId = (this.selectedGroup || new Group()).group_id;
                    const date = this.selected_date.jsdate;

                    this.dashboardService.getDashboardUsersData(this.currentDomain, groupId, date)
                    .then(data => {

                        const notEmptyChart = Object.keys(data.sessions_over_time_chart).reverse()
                                                .filter(k => data.sessions_over_time_chart[k])[0];

                        data.sessions_over_time_chart.selected_chart = notEmptyChart;


                        if (!data.grad_undergrad_chart.data.datasets[0].data.some(v => v)) {
                            data.grad_undergrad_chart = undefined;
                        }
                        if (!data.grad_year_chart.data.datasets[0].data.length) {
                            data.grad_year_chart = undefined;
                        }
                        if (!data.self_reported_interests_chart.data.datasets[0].data.length) {
                            data.self_reported_interests_chart = undefined;
                        }
                        if (!data.fields_of_study_chart.length) {
                            data.fields_of_study_chart = undefined;
                        }

                        if (!data.grad_undergrad_chart
                            && !data.grad_year_chart
                            && !data.self_reported_interests_chart
                            && !data.fields_of_study_chart
                            && !notEmptyChart) {
                            this.alertService.error('The selected filters has returned empty data.');
                            this.removeSelectedGroup();
                        } else {
                            this.tabs_data.users = data;
                        }
                        resolve();
                    }, () => {
                        this.alertService.error('Could not load users data');
                        this.tabs_data.users = {
                            error: true
                        };
                        reject();
                    });

                },
                events: () => {
                    const date = this.selected_date.jsdate;

                    this.dashboardService.getDashboardEventsData(this.currentDomain, date)
                    .then(data => {

                        let notEmptyChart = Object.keys(data.event_posting_over_time).reverse()
                                                .filter(k => data.event_posting_over_time[k])[0];

                        data.event_posting_over_time.selected_chart = notEmptyChart;

                        notEmptyChart = Object.keys(data.event_time_over_time).reverse()
                                                .filter(k => data.event_time_over_time[k])[0];

                        data.event_time_over_time.selected_chart = notEmptyChart;

                        notEmptyChart = Object.keys(data.event_attendance_over_time).reverse()
                                                .filter(k => data.event_attendance_over_time[k])[0];

                        data.event_attendance_over_time.selected_chart = notEmptyChart;

                        if (!data.free_food_events_chart.data.datasets[0].data.some(v => v)) {
                            data.free_food_events_chart = undefined;
                        }
                        if (!data.events_by_audience.grad_undergrad_chart.data.datasets[0].data.some(v => v)) {
                            data.events_by_audience.grad_undergrad_chart = undefined;
                        }
                        if (!data.events_by_audience.grad_year_chart.data.datasets[0].data.length) {
                            data.events_by_audience.grad_year_chart = undefined;
                        }
                        if (!data.events_by_audience.fields_of_study_chart.length) {
                            data.events_by_audience.fields_of_study_chart = undefined;
                        }

                        if (!data.events_by_audience.grad_undergrad_chart
                            && !data.events_by_audience.grad_year_chart
                            && !data.events_by_audience.fields_of_study_chart) {
                            data.events_by_audience = undefined;
                        }

                        if (!data.free_food_events_chart
                            && !data.events_by_audience
                            && !data.event_posting_over_time.selected_chart
                            && !data.event_time_over_time.selected_chart
                            && !data.event_attendance_over_time.selected_chart) {
                            this.alertService.error('The selected filters has returned empty data.');
                        } else {
                            this.tabs_data.events = data;
                        }
                        resolve();
                    }, () => {
                        this.alertService.error('Could not load events data');
                        this.tabs_data.events = {
                            error: true
                        };
                        reject();
                    });
                },
                groups: () => {
                    console.log(2);
                }
            })[this.selectedTab]();
        });
    }

    setAutoComplete() {
        jQuery(document).on('keydown.autocomplete', '#selGroup', eventKeydown => {
            jQuery(eventKeydown.target).autocomplete({
                source: (req, res) => {
                    // use groups list
                    let list: any[] = this.groups;
                    // map to proper format
                    list = list.map(g => {
                        return {
                            label: g.name,
                            value: g.name,
                            group_id: g.group_id
                        };
                    });
                    // filter list
                    list = jQuery.ui.autocomplete.filter(list, req.term);
                    // slice to maxResults
                    list = list.slice(0, this.groupsMaxResults);
                    res(list);
                },
                minLength: 1,
                select: (eventSelect, selected) => {
                    this.selectedGroup = this.groups.filter(g => g.group_id === selected.item.group_id)[0];
                    this.zone.run(() => this.loadTab());
                }
            });
        });
    }

    removeSelectedGroup() {
        this.selectedGroup = undefined;
        this.zone.run(() => this.loadTab());
    }

    groupChange(group: Group) {
        if (group) {
            this.selectedGroup = group;
        }
    }
}
