import { Component, OnInit, NgZone } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';

import { Activity, Domain, Group } from '../../models/index';
import { ActivityService, DomainService, AlertService, GroupService } from '../../services/index';
import { AppSettings } from '../../app.settings';

declare var jQuery;

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
    loading: boolean = false;
    currentDomain: string;

    activities: Activity[] = [];
    activity: Activity = new Activity();

    analytics: any;

    // sessions over time charts
    private over_time_charts = [
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

    groups: Group[] = [];
    selectedGroup: Group;
    flagged: boolean = false;

    filtersOpened = true;
    advancedSearch = false;

    tab: number = 0;

    // date selection
    private selected_date: IMyDateModel;
    private date_options: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        width: '100%',
        editableDateField: false,
        showClearDateBtn: false
    };
    private date_filter_options: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        width: '100%',
        editableDateField: false
    };

    constructor (private activityService: ActivityService,
                 private groupService: GroupService,
                 private domainService: DomainService,
                 private alertService: AlertService,
                 private zone: NgZone) {
        const today = moment();
        this.selected_date = <IMyDateModel>{
            date: {
                year: today.year(),
                month: today.month() + 1,
                day: today.date()
            },
            jsdate: today.toDate()
        };
        this.currentDomain = AppSettings.getCurrentDomain();
        this.loadPage();
        this.loadGroups();
        this.setAutoComplete();
    }

    onDateChanged(event: IMyDateModel) {
        this.selected_date = event;
        this.loading = true;
        this.loadAnalytics().then(() => this.loading = false);
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
                    list = list.slice(0, 15);
                    res(list);
                },
                minLength: 1,
                select: (eventSelect, selected) => {
                    this.zone.run(() => {
                        this.selectedGroup = this.groups.filter(g => g.group_id === selected.item.group_id)[0];
                    });
                }
            });
        });
    }

    removeSelectedGroup() {
        this.zone.run(() => this.selectedGroup = undefined);
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(domain => {
            this.currentDomain = domain.id;
            this.loadPage();
        });
    }

    getFilter() {
        let filter;
        if (this.filtersOpened) {
            filter = {
                title: this.activity.title,
                start_time: (this.activity.start_time || ''),
                end_time: (this.activity.end_time || '')
            };
            if (this.advancedSearch) {
                filter = Object.assign(filter, {
                    flagged: this.flagged === undefined ? undefined : (Number(this.flagged) === 1)
                });
            }
        }
        return filter;
    }

    loadActivities(): Promise<any> {
        return this.activityService.getAll(this.currentDomain, this.getFilter()).then(activities => this.activities = activities);
    }

    loadAnalytics(): Promise<any> {
        return this.activityService.getActivityAnalytics(this.currentDomain, this.selected_date.jsdate, this.getFilter())
            .then(analytics => this.analytics = analytics);
    }

    loadPage() {
        this.loading = true;
        Promise.all([this.loadActivities(), this.loadAnalytics()]).then(() => this.loading = false, () => {
            this.alertService.error('Could load activities data.');
            this.loading = false;
        });
    }

    loadGroups() {
        this.groupService.getAll(this.currentDomain).then(groups => this.groups = groups.filter(g => Object.keys(g.members || {}).length));
    }

    changeSuspension(activity: Activity, suspended: boolean) {
        // this.activityService.changeActivitySuspension(activity.activity_id, this.currentDomain, suspended).then(() => {
        //     activity.suspended = suspended;
        // });
    }

    setStartTime(date: IMyDateModel) {
        if (date.epoc === 0) {
            return this.activity.start_time = undefined;
        }
        const oDate = moment(date.epoc * 1000).startOf('day').toDate();
        this.activity.start_time = Date.UTC(
            oDate.getUTCFullYear(),
            oDate.getUTCMonth(),
            oDate.getUTCDate(),
            oDate.getUTCHours(),
            oDate.getUTCMinutes(),
            oDate.getUTCSeconds()
        ) / 1000;
    }

    setEndTime(date: IMyDateModel) {
        if (date.epoc === 0) {
            return this.activity.end_time = undefined;
        }
        const oDate = moment(date.epoc * 1000).endOf('day').toDate();
        this.activity.end_time = Date.UTC(
            oDate.getUTCFullYear(),
            oDate.getUTCMonth(),
            oDate.getUTCDate(),
            oDate.getUTCHours(),
            oDate.getUTCMinutes(),
            oDate.getUTCSeconds()
        ) / 1000;
    }
}
