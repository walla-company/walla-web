import { Component, OnInit, NgZone } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';

import { User, Domain, Group } from '../../models/index';
import { UserService, DomainService, AlertService, GroupService } from '../../services/index';
import { AppSettings } from '../../app.settings';

declare var jQuery;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    loading: boolean = false;
    currentDomain: string;

    users: User[] = [];
    user: User = new User();

    analytics: any;

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

    groups: Group[] = [];
    selectedGroup: Group;

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

    constructor (private userService: UserService,
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
                first_name: this.user.first_name,
                last_name: this.user.last_name
            };
            if (this.advancedSearch) {
                filter = Object.assign(filter, {
                    email: this.user.email,
                    hometown: this.user.hometown,
                    description: this.user.description,
                    major: this.user.major,
                    graduation_year: '=' + (this.user.graduation_year || ''),
                    academic_level: '=' + (this.user.academic_level || ''),
                    verified: this.user.verified === undefined ? undefined : (Number(this.user.verified) === 1),
                    group: (this.selectedGroup || <any>{}).group_id
                });
            }
        }
        return filter;
    }

    loadUsers(): Promise<any> {
        return this.userService.getAll(this.currentDomain, this.getFilter()).then(users => this.users = users);
    }

    loadAnalytics(): Promise<any> {
        return this.userService.getUserAnalytics(this.currentDomain, this.selected_date.jsdate, this.getFilter())
            .then(analytics => this.analytics = analytics);
    }

    loadPage() {
        this.loading = true;
        Promise.all([this.loadUsers(), this.loadAnalytics()]).then(() => this.loading = false, () => {
            this.alertService.error('Could load users data.');
            this.loading = false;
        });
    }

    loadGroups() {
        this.groupService.getAll(this.currentDomain).then(groups => this.groups = groups.filter(g => Object.keys(g.members || {}).length));
    }
}
