import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DetailsService } from '../details/details.service';
import { LoginService } from '../login/login.service';

import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BorrowBookInfo} from '../interface/book.interface';
import { AuthService } from '../guard/AuthService';
import { UserInfoService } from '../user-info/user-info.Service';
import { LoginInfoSerive } from '../service/loginInfo.Service';
import { User } from '../interface/user.interface';
const navigateMap = {
  1: 'details',
  2: 'returnBook',
  3: 'book_management',
  4: 'userLog',
  5: 'Top',
  6: 'user_management'
};
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService, LoginService, BsModalService]
})
export class DetailsComponent implements OnInit, AfterViewInit , OnDestroy {
  selectInfo = {
    userid : null,
    bookid : null,
    authorName : '',
    bookName : '',
    educationName : ''
  };
  book: BorrowBookInfo;
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  book1 = {
    bookid : '',
    authorName : '',
    bookName : '',
    educationName : '',
    quantity : 0
  };
  borrowBookInput: BorrowBookInfo;
  borrowBookByrecall = {
    userid : '',
    bookid : '',
    authorName : '',
    bookName : '',
    educationName : '',
    startTime: ''
  };
  userid = ' ';
  modalRef: BsModalRef;
  borrowBooks: BorrowBookInfo[];
  borrowBooksPage: BorrowBookInfo[];
  type = '1';
  pageNew = 0;
  pageAll: number;
  pageArry: number[];
  pagination = {
    page: 0,
    count: 5,
  };
  constructor(private detailsService: DetailsService,
              private router: Router, private modalService: BsModalService,
              private authService: AuthService, private loginInfoService: LoginInfoSerive ) {}
  public tagClick(type) {
    const url = navigateMap[type];
    console.log(type);
    if (url) {
        this.type = type;
        this.router.navigate([url]);
    }
  }
  // 搜索所有
  public search() {
    this.detailsService.search().subscribe(
      data => {
        // this.initPag(data.data);
        this.borrowBooks = data.data;
        // 从0开始到第五个
        this.borrowBooksPage = this.borrowBooks.slice(0, 5);
        // 得到页数 比如9条数据
        this.pageAll = Math.ceil(data.data.length / this.pagination.count);
        // 创建页数数组[1,2]
        this.getPageArry(this.pageAll);
        console.log(this.pageArry);
        console.log(this.borrowBooksPage);
    });
  }
  // 搜索
  public searchByinput(selectInfo) {
    console.log(selectInfo);
    this.detailsService.searchByinput(this.selectInfo).subscribe(
      data => {
        this.borrowBooks = data.data;
        // 获得前五条
        this.borrowBooksPage = this.borrowBooks.slice(0, 5);
        // 获得页数
        this.pageAll = Math.ceil(data.data.length / this.pagination.count);
        this.getPageArry(this.pageAll);
    });
  }
  // 重置
  public reset() {
    this.selectInfo = {
      userid : '',
      bookid : '',
      authorName : '',
      bookName : '',
      educationName : ''
    };
  }
  // 催还
  public Recall(borrowBook: BorrowBookInfo) {
    // 容器
      this.borrowBookByrecall = borrowBook;
      console.log(this.borrowBookByrecall);
      const backWindos = document.getElementById('back_reacll');
      const recallWindos = document.getElementById('RecallWindow');
      backWindos.style.display = 'block';
      recallWindos.style.display = 'block';
  }
  // 确定催还
  public Yes() {
    const backWindos = document.getElementById('back_reacll');
    const recallWindos = document.getElementById('RecallWindow');
    this.detailsService.recall(this.borrowBookByrecall).subscribe(
        data => {
            if (data.state_id) {
              backWindos.style.display = 'none';
              recallWindos.style.display = 'none';
              alert('催还成功');
            } else {
              alert('催还失败');
            }
        }
      );
  }
  // 图书催还界面
  public No() {
      const backWindos = document.getElementById('back_reacll');
      const recallWindos = document.getElementById('RecallWindow');
      backWindos.style.display = 'none';
      recallWindos.style.display = 'none';
  }
  // 创建页数数组
  public getPageArry(pageAll: number) {
    let i: number;
    this.pageArry = [0];
    for ( i = 0; i < pageAll; i++) {
        this.pageArry[i] = i;
      }
  }
  // 前端分页
  public changPageByBefor(page: number) {
    console.log(page);
    this.pageNew = page;
    // 第几条信息
    this.pagination.page = this.pagination.count * this.pageNew;
    // 容器清零
    this.borrowBooksPage = [];
    // 容器赋值
    this.borrowBooksPage =  this.borrowBooks.slice(this.pagination.page, this.pagination.page + this.pagination.count);
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
  ngAfterViewInit() {
    this.search();
  }
  ngOnDestroy() {
  }

}
