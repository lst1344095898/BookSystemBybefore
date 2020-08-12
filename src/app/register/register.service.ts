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
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

 public register(data: any): Observable<any> {
    return this.httpClient.post<boolean>('http://localhost:8080/register', data);
  }


  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      log(`${operation} failed: ${error.message}`);

      return of(result as T);
      };
  }

}
