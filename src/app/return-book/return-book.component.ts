import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnBookService } from './returnBook.service';
import { AuthService } from '../guard/AuthService';
import { LoginInfoSerive } from '../service/loginInfo.Service';
const navigateMap = {
  1: 'details',
  2: 'returnBook',
  3: 'book_management',
  4: 'userLog',
  5: 'top',
  6: 'user_management'
};
@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {
  type = '2';
  userid = '';
  bookid = '';
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  constructor(private router: Router, private returnBookService: ReturnBookService, private authService: AuthService,
              private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) {
    const url = navigateMap[type];
    console.log(type);
    if (url) {
        this.type = type;
        this.router.navigate([url]);
    }
  }
  public returnBook() {
      console.log(this.userid);
      this.returnBookService.returnBook(this.userid, this.bookid).subscribe(
        data => {
          if (data === true) {
            alert('归还成功');
            this.userid = '';
            this.bookid = '';
          } else {
            alert('归还失败,请检查输入');
          }
        });
  }
  public cancel() {
    this.userid = '';
    this.bookid = '';
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

}
