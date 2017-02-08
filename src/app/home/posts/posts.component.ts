import { Component } from '@angular/core';

import { Activity, Domain } from '../../models/index';
import { ActivityService, DomainService } from '../../services/index';
import { AppSettings } from '../../app.settings';

@Component({
    moduleId: module.id,
    selector: 'wl-posts',
    templateUrl: 'posts.html'
})
export class PostsComponent {
    activities: Activity[] = [];
    domains: Domain[];
    loading: boolean = false;
    school_id: string;
    constructor (private activityService: ActivityService,
                 private domainService: DomainService) {
        this.domains = AppSettings.getAllowedDomains();
        this.school_id = AppSettings.getCurrentDomain();
        this.loadPosts();
    }

    changeDomain() {
        AppSettings.setCurrentDomain(this.school_id);
        this.loadPosts();
    }

    loadPosts() {
        this.loading = true;
        this.activityService.getAll(this.school_id).then(posts => {
            let tmpPosts: Activity[] = [];
            for (let id in posts) {
                if (posts.hasOwnProperty(id)) {
                    tmpPosts.push(<Activity> posts[id]);
                }
            }
            this.activities = tmpPosts;
            this.loading = false;
        });
    }
}
