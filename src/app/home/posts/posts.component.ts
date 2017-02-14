import { Component, OnInit } from '@angular/core';

import { Activity, Domain } from '../../models/index';
import { ActivityService, DomainService, AlertService } from '../../services/index';
import { AppSettings } from '../../app.settings';

@Component({
    moduleId: module.id,
    selector: 'wl-posts',
    templateUrl: 'posts.html'
})
export class PostsComponent implements OnInit {
    activities: Activity[] = [];
    loading: boolean = false;
    search: string;

    constructor (private activityService: ActivityService,
                 private domainService: DomainService,
                 private alertService: AlertService) {
        this.loadPosts();
    }

    ngOnInit() {
        this.domainService.getCurrentDomain().subscribe(() => {
           this.loadPosts();
        });
    }

    test() {
        console.log('this is a test');
    }

    loadPosts() {
        this.loading = true;
        this.activityService.getAll(AppSettings.getCurrentDomain()).then(posts => {
            let tmpPosts: Activity[] = [];
            for (let id in posts) {
                if (posts.hasOwnProperty(id)) {
                    tmpPosts.push(<Activity> posts[id]);
                }
            }
            this.activities = tmpPosts;
            this.loading = false;
        }, () => {
            this.alertService.error('Could load posts data.');
            this.loading = false;
        });
    }
}
