import { Component, OnInit , ChangeDetectorRef } from '@angular/core';

import { DomainService, DashboardService, AlertService, GroupService } from '../../services/index';
import { DashboardData, Group } from '../../models/index';
import { AppSettings } from '../../app.settings';

declare var jQuery;

@Component({
    moduleId: module.id,
    selector: 'wl-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls: [
        'dashboard.css'
    ]
})
export class DashboardComponent implements OnInit {
    loading: boolean = false;
    dashboardData: DashboardData = new DashboardData();
    currentDomain: string;

    // group selection
    selectedGroup: Group;
    groups: Group[] = [];

    // chart data
    gradUndergradChartData: any = {};
    gradYearChartData: any = {};

    constructor (private domainService: DomainService,
                 private dashboardService: DashboardService,
                 private alertService: AlertService,
                 private groupService: GroupService,
                 private changeDetector: ChangeDetectorRef) {
        this.currentDomain = AppSettings.getCurrentDomain();
        this.loadDashboardData();
        this.loadCharts();
        this.setAutoComplete();
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(domain => {
            this.currentDomain = domain.id;
            this.loadDashboardData();
        });
    }

    setAutoComplete() {
        let self = this;
        jQuery(document).on('keydown.autocomplete', '#selGroup', function(){
            jQuery(this).autocomplete({
                source: function(req, res) {
                    // use groups list
                    let list: any[] = self.groups;
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
                    list = list.slice(0, this.options.maxResults);
                    res(list);
                },
                minLength: 1,
                maxResults: 15,
                select: function(event, selected) {
                    self.selectedGroup = self.groups.filter(g => g.group_id === selected.item.group_id)[0];
                    self.changeDetector.detectChanges();
                    self.loadCharts(true);
                }
            });
        });
    }

    removeSelectedGroup() {
        this.selectedGroup = undefined;
        this.changeDetector.detectChanges();
        this.loadCharts(true);
    }

    groupChange(group: Group) {
        if (group) {
            this.selectedGroup = group;
        }
    }

    loadDashboardData() {
        this.loading = true;
        let getDashboardData = this.dashboardService.getDashboardData(this.currentDomain);
        let getAllGroups = this.groupService.getAll(this.currentDomain);

        Promise.all([getDashboardData, getAllGroups]).then(values => {
            this.dashboardData = values[0];
            this.groups = values[1];
            this.loading = false;
        }, () => {
            this.alertService.error('Could not load dashboard data.');
            this.loading = false;
        });
    }

    loadCharts(detectChanges = false) {
        this.loading = true;
        if (detectChanges) {
            this.changeDetector.detectChanges();
        }

        let groupId = (this.selectedGroup || new Group()).group_id;
        let getGradUndergradChartData = this.dashboardService.getGradUndergradChartData(this.currentDomain, groupId);
        let getGradYearChartData = this.dashboardService.getGradYearChartData(this.currentDomain, groupId);

        Promise.all([getGradUndergradChartData, getGradYearChartData]).then(values => {
            this.gradUndergradChartData = values[0];
            this.gradYearChartData = values[1];
        }, () => {
            this.alertService.error('Could not load charts data.');
            this.loading = false;
            if (detectChanges) {
                this.changeDetector.detectChanges();
            }
        });
    }
}
