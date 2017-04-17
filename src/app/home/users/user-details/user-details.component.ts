import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { User } from '../../../models/index';
import { UserService, DomainService, AlertService } from '../../../services/index';
import { AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
    currentDomain: string;
    user: User;
    verified: number;

    constructor (private userService: UserService,
                 private domainService: DomainService,
                 private route: ActivatedRoute,
                 private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.currentDomain = AppSettings.getCurrentDomain();
            const user_id = params['user_id'];
            if (!user_id) {
                return this.router.navigate(['/home/users']);
            }
            this.loadUser(user_id);
        });
   }

    loadUser(user_id: string) {
        this.userService.getById(user_id, this.currentDomain).then(user => {
            if (!user.user_id) {
                return this.router.navigate(['/home/users']);
            }
            this.user = user;
            this.verified = user.verified ? 1 : 0;
        });
    }
}
