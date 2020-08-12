import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from './userInfo.model';

import {logger} from 'codelyzer/util/logger';
import {log} from 'util';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      // tslint:disable-next-line:object-literal-shorthand
      username: username,
      // tslint:disable-next-line:object-literal-shorthand
      password: password
  };
    console.log(body);
    console.log(this.httpClient.post('http://localhost:8080/login', body));
    return this.httpClient.post('http://localhost:8080/login', body);
  }
  public e_mailJudge(email): Observable<any> {
    const httpparams = new HttpParams(
      {
        fromString: 'email=' + email
    });
    const findhttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: httpparams
    };
    return this.httpClient.get('http://localhost:8080/e_mailJudge', findhttpOptions);
  }
  public editPassword(userid, x): Observable<any> {
    const httpparams = new HttpParams(
      {
        fromString: 'userid=' + userid + '&password=' + x
    });
    const findhttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: httpparams
    };
    return this.httpClient.get('http://localhost:8080/editPassword', findhttpOptions);
  }


  // private handleError<T>(operation = 'operation', result?: T) {

  //   return (error: any): Observable<T> => {

  //     log(`${operation} failed: ${error.message}`);

  //     return of(result as T);
  //     };
  // }

}
