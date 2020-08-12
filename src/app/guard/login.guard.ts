import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(public router: Router, private authService: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
                    return this.checkLogin(route);
                }
    public checkLogin(route: any): boolean {
        const bool = this.authService.return_off();
        const ability = this.authService.return_ability();
        console.log(bool);
        if (bool === false && ability === false) {
            alert('请先登录账号');
            this.router.navigate(['/login']);
            return true;
        }
        return bool;
    }
}
