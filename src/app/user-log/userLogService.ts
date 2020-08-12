
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UserLogService {
    constructor(private httpClient: HttpClient) {}
        public search(): Observable<any> {
            return this.httpClient.get('http://localhost:8080/getLog'); // 从服务器得到数据
        }
}
