import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UserManagmentService {
    constructor(private httpClient: HttpClient) {}
    public getUserAll(data: any): Observable<any> {
        console.log(data);
        return this.httpClient.post('http://localhost:8080/getUserAllByInput', data);
    }
    public deletUser(data: any): Observable<any> {
        return this.httpClient.post('http://localhost:8080/deletUser', data);
    }
}
