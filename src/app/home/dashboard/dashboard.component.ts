import { Component, OnInit } from '@angular/core';

// import { Domain } from '../../models/index';
import { DomainService, DashboardService, AlertService } from '../../services/index';
import { DashboardData } from '../../models/index';
import { AppSettings } from '../../app.settings';

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
    gradUndergradChartData: any = {};
    gradYearChartData: any = {};

    constructor (private domainService: DomainService,
                 private dashboardService: DashboardService,
                 private alertService: AlertService) {
        this.currentDomain = AppSettings.getCurrentDomain();
        this.loadDashboardData();
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(domain => {
            this.currentDomain = domain.id;
            this.loadDashboardData();
        });
    }

    loadDashboardData() {
        let onError = () => {
            this.alertService.error('Could not load dashboard data.');
            this.loading = false;
        };
        this.loading = true;
        this.dashboardService.getDashboardData(this.currentDomain).then(data => {
            this.dashboardData = data;
            this.dashboardService.getGradUndergradChartData(this.currentDomain).then(gradUndergradChartData => {
                this.gradUndergradChartData = gradUndergradChartData;
                this.dashboardService.getGradYearChartData(this.currentDomain).then(gradYearChartData => {
                    this.gradYearChartData = gradYearChartData;
                    this.loading = false;
                }, onError);
            }, onError);
        }, onError);
    }
}
