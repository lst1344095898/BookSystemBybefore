import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Book, BorrowBookInfo } from '../interface/book.interface';
import { Router } from '@angular/router';
import { UserDetailsService } from './user-details.Service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../guard/AuthService';
import { LoginInfoSerive } from '../service/loginInfo.Service';

const navigateMap = {
  1: 'userDetails',
  2: 'userBookShelf',
  3: 'userInfo',
  4: 'Top',
};
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserDetailsService]
})
export class UserDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  book: Book;
  books: Book[];
  type = '1';
  userid = '';
  modalRef: BsModalRef;
  booksPage: Book[];
  pageAll: number;
  pageArry: number[];
  pageNew = 0;
  pagination = {
    page: 0,
    count: 5,
  };
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  selectBook = {
    bookid: '',
    bookName: '',
    educationName: '',
    authorName: '',
    quantity: 0
  };
  borrowBook = {
    userid: 0,
    bookid: '',
    bookName: '',
    educationName: '',
    authorName: ''
  };
  constructor(private router: Router, private userDetailsService: UserDetailsService, private modalService: BsModalService,
              private authService: AuthService, private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) {
      this.type = type;
      console.log(type);
      const url = navigateMap[type];
      console.log('type' + url);
      if (url) {
        this.router.navigate([url]);
      }
  }
  public search() {
    this.userDetailsService.search().subscribe(
      data => {
        this.books = data.data;
        this.booksPage = this.books.slice(0, 5);
        this.pageAll = Math.ceil(data.data.length / this.pagination.count);
        this.getPageArry(this.pageAll);
        console.log(this.books);
      }
    );
  }
  public getPageArry(pageAll) {
    let i: number;
    this.pageArry = [0];
    for ( i = 0; i < pageAll; i++) {
        this.pageArry[i] = i;
      }
  }
  public changPageByBefor(page: number) {
    console.log(page);
    this.pageNew = page;
    this.pagination.page = this.pagination.count * this.pageNew;
    this.booksPage = [];
    this.booksPage =  this.books.slice(this.pagination.page, this.pagination.page + this.pagination.count);
  }
  // 调用模态框
  public Borrow(template, book: Book) {
    this.book = book;
    console.log(this.book);
    console.log(this.borrowBook);
    this.borrowBook.bookid = book.bookid;
    this.borrowBook.bookName = book.bookName;
    this.borrowBook.educationName = book.educationName;
    this.borrowBook.authorName = book.authorName;
    // this.borrowBook.book = book;
    this.modalRef = this.modalService.show(template);
  }
  public Yes() {
    this.borrowBook.userid = this.loginInfoService.getUserId();
    console.log(this.borrowBook);
    console.log('user_id' + this.borrowBook.userid);
    this.modalRef.hide();
    this.userDetailsService.borrowAdd(this.borrowBook).subscribe(
      data => {
        if (data.state_id === true) {
          alert('借阅成功');
        } else  {
          alert (data.error);
        }
      }
    );
  }
  public selectBookByInputInfo() {
      console.log(this.selectBook);
      this.userDetailsService.getBooksByInputInfo(this.selectBook).subscribe(
        data => {
          this.books = data.data;
          this.booksPage = this.books.slice(0, 5);
          this.pageAll = Math.ceil(data.data.length / this.pagination.count);
          this.getPageArry(this.pageAll);
        }
      );
  }
  public Reset() {
      this.selectBook.bookid = '';
      this.selectBook.bookName = '';
      this.selectBook.educationName = '';
      this.selectBook.authorName = '';
  }
  public out() {
    this.authService.login_off();
    this.router.navigate(['/login']);
  }
  public showUserInfo() {
    this.userInfoHeard.username = this.loginInfoService.getUser().username;
    this.userInfoHeard.grade = this.loginInfoService.getUser().grade;
    if (this.loginInfoService.getUser().user_code === 1) {
        this.userInfoHeard.user_code = '用户';
    } else {
      this.userInfoHeard.user_code = '管理员';
    }
    const heardImg = document.getElementById('heard_img');
    const userInfo = document.getElementById('userInfo');
    heardImg.style.display = 'none';
    userInfo.style.display = 'block';
  }
  public exitShow() {
    const heardImg = document.getElementById('heard_img');
    const userInfo = document.getElementById('userInfo');
    heardImg.style.display = 'block';
    userInfo.style.display = 'none';
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.search();
  }
  ngOnDestroy(): void {
  }

}
