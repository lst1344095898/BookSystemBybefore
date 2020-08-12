import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BorrowBookInfo } from '../interface/book.interface';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private httpClient: HttpClient) { }
  public search(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/getBorowBooks'); // 从服务器模拟数据中得到数据
}
  public searchByinput(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.post('http://localhost:8080/booksByInput', data);
  }
  public borrowAdd(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/borrowAdd', data);
  }
  public changePage(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/changPage', data);
  }
  public recall(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/recallAdd', data);
  }
}
