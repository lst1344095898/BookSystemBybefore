import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TopService {
    constructor(private httpClient: HttpClient) { }
    searchBook(): Observable<any> {
        return this.httpClient.get('http://localhost:8080/getBookTop');
    }
    searchUser(): Observable<any> {
        return this.httpClient.get('http://localhost:8080/getUserTop');
    }
}
