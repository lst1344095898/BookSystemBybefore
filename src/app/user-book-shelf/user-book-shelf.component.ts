import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guard/AuthService';
import { BorrowBookInfo } from '../interface/book.interface';
import { LoginInfoSerive } from '../service/loginInfo.Service';
import { UserBookShelfSerive } from './userBookShelf.Service';
const navigateMap = {
  1: 'userDetails',
  2: 'userBookShelf',
  3: 'userInfo',
  4: 'Top',
};
@Component({
  selector: 'app-user-book-shelf',
  templateUrl: './user-book-shelf.component.html',
  styleUrls: ['./user-book-shelf.component.css'],
  providers: [UserBookShelfSerive]
})
export class UserBookShelfComponent implements OnInit, AfterViewInit, OnDestroy {
  type = '2';
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  borrowInfos: BorrowBookInfo[];
  constructor(private router: Router, private authService: AuthService, private userBookShelfService: UserBookShelfSerive,
              private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) {
    this.type = type;
    const url = navigateMap[type];
    console.log(url);
    if (url) {
      this.router.navigate([url], {queryParams: { codeId: false}});
    }
  }
  // 得到图书
  public getBorrowInfos() {
    const userid = this.loginInfoService.getUserId();
    this.userBookShelfService.getBorrowInfos(this.loginInfoService.getUserId()).subscribe(
      data => {
        this.borrowInfos = data.data;
      }
    );
  }
  public out() {
    this.authService.login_off();
    this.router.navigate(['/login']);
  }
  public delay(borrowInfo: BorrowBookInfo) {
      this.userBookShelfService.delay(borrowInfo).subscribe(
        data => {
          if ( data.state_id) {
              alert('申请成功');
          } else {
            alert('申请失败');
          }
        }
      );
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
    this.getBorrowInfos();
  }
  ngOnDestroy(): void {
  }
}
