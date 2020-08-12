import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserDetailsService {
    constructor(private httpClient: HttpClient) {}
    public search(): Observable<any> {
        return this.httpClient.get('http://localhost:8080/books');
    }
    public borrowAdd(data: any): Observable<any> {
        return this.httpClient.post('http://localhost:8080/borrowAdd', data);
      }
    public getBooksByInputInfo(data: any): Observable<any> {
        return this.httpClient.post('http://localhost:8080/getBooksByInputInfo', data);
     }
}
