import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(public router: Router, private authService: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
                    return this.checkLogin(route);
                }
    public checkLogin(route: any): boolean {
        const ability = this.authService.return_ability();
        console.log(ability);
        if (!ability) {
            alert('请登录管理员账号');
            this.router.navigate(['/login']);
            return true;
        }
        return ability;
    }
}
