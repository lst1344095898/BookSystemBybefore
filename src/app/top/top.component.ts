import { Component, OnInit, AfterViewInit, OnDestroy, enableProdMode } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TopService } from './topService';
import { BookTop , UserTop } from '../interface/book.interface';
import { AdminOrUserService } from '../service/AdminOrUser.service';
import { AuthService } from '../guard/AuthService';
import { LoginInfoSerive } from '../service/loginInfo.Service';
const navigateMap = {
  1: 'details',
  2: 'returnBook',
  3: 'book_management',
  4: 'userLog',
  5: 'Top',
  6: 'user_management'
};
const navigateMapUser = {
    1: 'userDetails',
    2: 'userBookShelf',
    3: 'userInfo',
    4: 'Top',
};
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
  providers: [TopService]
})
export class TopComponent implements OnInit, AfterViewInit, OnDestroy {
  [x: string]: any;
  type: string;
  show: boolean;
  noShow: boolean;
  codeId: boolean;
  bookTops: BookTop[];
  userTops: UserTop[];
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  constructor(private router: Router,
              private topService: TopService, private activatedRouter: ActivatedRoute, private adminOrUser: AdminOrUserService,
              private authService: AuthService, private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) {
    if (this.adminOrUser.getStatId()) {
      const url = navigateMap[type];
      console.log('Map: ' + url);
      if (url) {
           this.type = type;
           this.router.navigate([url]);
       }
    } else {
       const url = navigateMapUser[type];
       console.log(url);
       if (url) {
            this.type = type;
            this.router.navigate([url]);
        }
    }
  }
  public searchBook() {
      this.topService.searchBook().subscribe(
        data => {
          this.bookTops = data.data;
        }
      );
  }
  public searchUser() {
    this.topService.searchUser().subscribe(
      data => {
        this.userTops = data.data;
      }
    );
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
  ngOnInit() {}
  ngAfterViewInit() {
    if (this.adminOrUser.getStatId()) {
        this.show = true;
        this.noShow = false;
        this.type = '5';
    } else {
      this.show = false;
      this.noShow = true;
      this.type = '4';
    }
    this.searchBook();
    this.searchUser();
  }
  ngOnDestroy() {}

}
