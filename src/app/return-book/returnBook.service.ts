import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ReturnBookService {

  constructor(private httpClient: HttpClient) { }

  returnBook(userid: string, bookid: string): Observable<any> {
    const httpparams = new HttpParams(
        {
          fromString: 'userid=' + userid + '&bookid=' + bookid
      });
    const findhttpOptions = {
        headers: new HttpHeaders({'content-Type': 'application/json'}),
        params: httpparams
      };
    console.log(findhttpOptions);
    return this.httpClient.get<boolean>('http://localhost:8080/returnBook', findhttpOptions);
  }


}
