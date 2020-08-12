import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserBookShelfSerive {
    constructor(private httpClient: HttpClient) {}
    public getBorrowInfos(userid: any): Observable<any> {
        console.log(userid);
        const httpparams = new HttpParams(
            {
              fromString: 'userid=' + userid
          });
        const findhttpOptions = {
            headers: new HttpHeaders({'content-Type': 'application/json'}),
            params: httpparams
          };
        return this.httpClient.get('http://localhost:8080/getBorrowInfosByUserId', findhttpOptions);
    }
    public delay(data: any): Observable<any>{
        return this.httpClient.post('http://localhost:8080/delay', data);
    }
}
