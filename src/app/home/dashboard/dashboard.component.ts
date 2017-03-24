import { Component, OnInit } from '@angular/core';

import { DomainService, DashboardService, AlertService } from '../../services/index';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private currentDomain: string;
    private data: any;

    constructor (private domainService: DomainService,
                 private dashboardService: DashboardService,
                 private alertService: AlertService) {
        this.currentDomain = AppSettings.getCurrentDomain();
        this.load();
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(domain => {
            this.currentDomain = domain.id;
            this.load();
        });
    }

    reloadPage() {
        window.location.reload();
    }

    load() {
        this.data = undefined;
        this.dashboardService.getDashboardData(this.currentDomain).then(data => this.data = data);
    }
}
