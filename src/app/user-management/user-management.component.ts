import { Component, OnInit, AfterViewInit, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagmentService } from './user-managment.Service';
import { User } from '../interface/user.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  userid = '';
  username = '';
  type = '6';
  users: User[];
  userInfo: User;
  pageAll: number;
  pageArry: number[];
  pageNew = 0;
  modalRef: BsModalRef;
  deletUserInfo = {
    userid: 0,
    username: '',
    password: '',
    e_mail: '',
    birthday: '',
    studnetId: '',
    sex: '',
    grade: 0,
    user_code: 0,
    interest: '',
    introduce: '',
    telephone: '',
  };
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  pram = {
    page: 0,
    count: 5,
    userid: '',
    username: ''
  };
  constructor(private router: Router, private userManagementService: UserManagmentService, private modalService: BsModalService,
              private authService: AuthService, private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) { // 页面跳转函数
    this.type = type;
    const url = navigateMap[type];
    console.log(url);
    if (url) {
        this.router.navigate([url]);
    }
  }
  public getUserAll() {
    this.userManagementService.getUserAll(this.pram).subscribe(
      data => {
          if (data.state_id) {
              console.log(data.data);
              this.users = data.data;
              console.log(this.users);
              this.pageAll = Math.ceil(data.pages / this.pram.count);
              // 转换为数组【1，2】
              this.getPagArry(this.pageAll);
          }
      }
    );
  }
  public getPagArry(pageAll: number) {
    let i: number;
    this.pageArry = [];
    for ( i = 0; i < pageAll; i++) {
      this.pageArry[i] = i;
    }
  }
  public changPageByAfter(page: number) {
    console.log(page);
    this.pageNew = page;
    // 赋值
    this.pram.page = this.pageNew * this.pram.count;
    // 返回第二页
    this.userManagementService.getUserAll(this.pram).subscribe(
      data => {
        this.users = data.data;
        this.pageAll = Math.ceil(data.pages / this.pram.count);
        console.log(this.pageAll);
        this.getPagArry(this.pageAll);
      }
    );
  }
  public reset() {
    this.pram = {
      page: 0,
      count: 5,
      userid: '',
      username: ''
    };
  }
  public lookUser(template: TemplateRef<any>, user: User) {
    this.userInfo = user;
    this.modalRef = this.modalService.show(template);
  }
  public deletUser(user: User) {
      this.deletUserInfo = user;
      const backWindows = document.getElementById('back_reacll');
      const deletUserWindows = document.getElementById('DeletWindows');
      // 获取前端元素
      backWindows.style.display = 'block';
      deletUserWindows.style.display = 'block';

  }
  public Delet() {
    const backWindows = document.getElementById('back_reacll');
    const deletUserWindows = document.getElementById('DeletWindows');
    this.userManagementService.deletUser(this.deletUserInfo).subscribe(
      data => {
        if (data.state_id) {
          backWindows.style.display = 'none';
          deletUserWindows.style.display = 'none';
          alert('删除成功');
        } else {
          alert('失败');
        }
      }
    );
  }
  public returnBack() {
    const backWindows = document.getElementById('back_reacll');
    const deletUserWindows = document.getElementById('DeletWindows');
    backWindows.style.display = 'none';
    deletUserWindows.style.display = 'none';
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
    this.getUserAll();
  }
  ngOnDestroy(): void {
  }
}
