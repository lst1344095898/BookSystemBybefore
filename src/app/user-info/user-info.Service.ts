import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    constructor(private httpClient: HttpClient) {}
    public getUserInfo(userid: any): Observable<any> {
        console.log(userid);
        const httpparams = new HttpParams({
            fromString: 'userid=' + userid
        });
        const findhttpOptions = {
            headers: new HttpHeaders({'content-Type': 'application/json'}),
            params: httpparams
        };
        return this.httpClient.get('http://localhost:8080/getUserInfo',
        findhttpOptions);
    }
    public editUser(data: any): Observable<any> {
       return this.httpClient.post('http://localhost:8080/editUser', data);
    }
}
