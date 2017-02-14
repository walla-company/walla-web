import { Component, OnInit } from '@angular/core';

// import { Domain } from '../../models/index';
import { DomainService } from '../../services/index';
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
    currentDomain: string;

    constructor (private domainService: DomainService) {
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
        this.loading = true;
        setTimeout(() => this.loading = false, 500);
    }
}
