import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    off = false;
    ability = false;
    public login_On(ability: boolean) {
        this.off = !ability;
        this.ability = ability;
        console.log(this.off + ' ' + this.ability);
    }
    public login_off() {
        this.off = false;
    }
    public return_off(): boolean {
        return this.off;
    }
    public return_ability(): boolean {
        return this.ability;
    }
}
