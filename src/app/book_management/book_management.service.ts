
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interface/book.interface';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class BookManagementService {
    constructor(private httpClient: HttpClient) {}
        public search(): Observable<any> {
            return this.httpClient.get('http://localhost:8080/books'); // 从服务器得到数据
        }
        public searchByInput(data: any): Observable<any> {
            return this.httpClient.post('http://localhost:8080/getBooksByInputInfo', data); // 从服务器得到数据
        }
        public updata(data: Book): Observable<any> {
            return this.httpClient.post('http://localhost:8080/updata', data); // 更新
        }
        public add(book: Book) {
            console.log(book);
            const bookdata = {
                bookid: book.bookid,
                bookName: book.bookName,
                authorName: book.authorName,
                educationName: book.educationName,
                quantity: book.quantity
            };
            return this.httpClient.post<boolean>('http://localhost:8080/book_add', bookdata);
        }
        public searchByPram(data: any): Observable<any> {
            console.log(data);
            return this.httpClient.post('http://localhost:8080/booksByPram', data);
        }
}
