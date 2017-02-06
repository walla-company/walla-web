import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/index';
import { UserService , AlertService } from '../../services/index';
import { AppSettings } from '../../app.settings';

declare var Chart;

@Component({
    moduleId: module.id,
    selector: 'wl-users-form',
    templateUrl: 'users-form.html'
})
export class UsersFormComponent implements OnInit, OnDestroy {
    user: User;
    activity_since: string = 'day';
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

    private school_id: string;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.school_id = AppSettings.getCurrentDomain();
            let uid = params['id'];
            this.userService.getById(uid, this.school_id).then(user => {
                this.user = user;
                // setTimeout(this.setChart, 1000); // wait for the canvas to be drawn. provisory
            });
            this.userService.getUserInterests(uid, this.school_id).then(list => {
                console.log(list);
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    updateFirstName() {
        this.userService.updateFirstName(this.user.user_id, this.school_id, this.user.first_name)
            .then(() => {
                this.alertService.success('First name updated');
            }, () => {
                this.alertService.error('An error ocurred updating first name');
            });
    }

    updateLastName() {
        this.userService.updateLastName(this.user.user_id, this.school_id, this.user.last_name)
            .then(() => {
                this.alertService.success('Last name updated');
            }, () => {
                this.alertService.error('An error ocurred updating last name');
            });
    }

    updateEmail() {
        this.userService.updateEmail(this.user.user_id, this.school_id, this.user.email)
            .then(() => {
                this.alertService.success('Email updated');
            }, () => {
                this.alertService.error('An error ocurred updating email');
            });
    }

    updateAcademicLevel() {
        this.userService.updateAcademicLevel(this.user.user_id, this.school_id, this.user.academic_level)
            .then(() => {
                this.alertService.success('Academic level updated');
            }, () => {
                this.alertService.error('An error ocurred updating academic level');
            });
    }

    updateMajor() {
        this.userService.updateMajor(this.user.user_id, this.school_id, this.user.major)
            .then(() => {
                this.alertService.success('Major updated');
            }, () => {
                this.alertService.error('An error ocurred updating major');
            });
    }

    updateGraduationYear() {
        this.userService.updateGraduationYear(this.user.user_id, this.school_id, this.user.graduation_year)
            .then(() => {
                this.alertService.success('Graduation year updated');
            }, () => {
                this.alertService.error('An error ocurred updating graduation year');
            });
    }

    updateHometown() {
        this.userService.updateHometown(this.user.user_id, this.school_id, this.user.hometown)
            .then(() => {
                this.alertService.success('Hometown updated');
            }, () => {
                this.alertService.error('An error ocurred updating hometown');
            });
    }

    updateDescription() {
        this.userService.updateDescription(this.user.user_id, this.school_id, this.user.description)
            .then(() => {
                this.alertService.success('Description updated');
            }, () => {
                this.alertService.error('An error ocurred updating description');
            });
    }

    updateProfileImageUrl() {
        this.userService.updateProfileImageUrl(this.user.user_id, this.school_id, this.user.profile_image_url)
            .then(() => {
                this.alertService.success('Profile image url updated');
            }, () => {
                this.alertService.error('An error ocurred updating profile image url');
            });
    }
}
