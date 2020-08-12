import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminOrUserService {
    constructor() {}
    statId: boolean;
    public switch(ID: boolean) {
        this.statId = ID;
    }
    public getStatId() {
        return this.statId;
    }
}
