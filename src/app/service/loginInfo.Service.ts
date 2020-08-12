import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';

@Injectable({
    providedIn: 'root'
})
export class LoginInfoSerive {
    userid: number;
    user: User;
    constructor() {}
    public storageId(userid) {
        this.userid = userid;
    }
    public setUser(user: User) {
        this.user = user;
    }
    public getUser(): User {
        return this.user;
    }
    public getUserId(): number {
        return this.userid;
    }
}
