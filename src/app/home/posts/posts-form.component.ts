import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Activity } from '../../models/index';
import { ActivityService , AlertService } from '../../services/index';
import { AppSettings } from '../../app.settings';

declare var Chart;

@Component({
    moduleId: module.id,
    selector: 'wl-posts-form',
    templateUrl: 'posts-form.html'
})
export class PostsFormComponent implements OnInit, OnDestroy {
    activity: Activity;
    chartData: any = {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Activities attended',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    private sub: any;

    constructor(private route: ActivatedRoute,
                private activityService: ActivityService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let uid = params['id'];
            this.activityService.getById(uid, AppSettings.getCurrentDomain()).then(post => {
                this.activity = post;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
