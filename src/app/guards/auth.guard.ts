import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/index';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private router: Router,
                 private authService: AuthService) { }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('userData')) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
    }
}
