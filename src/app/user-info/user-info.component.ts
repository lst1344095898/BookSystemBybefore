import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';
import { UserInfoService } from './user-info.Service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginInfoSerive } from '../service/loginInfo.Service';
import { AuthService } from '../guard/AuthService';
const navigateMap = {
  1: 'userDetails',
  2: 'userBookShelf',
  3: 'userInfo',
  4: 'Top',
};
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [UserInfoService]
})
export class UserInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  userid = '1';
  modalRef: BsModalRef;
  type = '3';
  user: User;
  userEdit: User;
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  messages = {
    error : {
      userid: false,
      username: false,
      password: false,
      e_mail: false,
      birthday: false,
      sex: false,
      grade: false,
      user_code: false,
      interest: false,
      introduce: false
    },
    errorMessages: ''
};
  constructor(private router: Router, private userInfoService: UserInfoService,
              private modalService: BsModalService, private loginInfoService: LoginInfoSerive,
              private authService: AuthService) { }
  public tagClick(type) {
    this.type = type;
    const url = navigateMap[type];
    console.log(url);
    if (url) {
      this.router.navigate([url], {queryParams: { codeId: false}});
    }
  }
  public getUserInfo() {
    console.log(this.loginInfoService.getUserId());
    this.userInfoService.getUserInfo(1).subscribe(
      // this.userInfoService.getUserInfo(this.loginInfoService.getUserId()).subscribe(
      data => {
        this.user = data.data[0];
        this.userEdit = data.data[0];
        console.log(this.user);
      }
    );
  }
  public Administration(template) {
    this.modalRef = this.modalService.show(template);
  }
  // 更新
  public Yes() {
    if (this.verification()) {
      this.modalRef.hide();
      this.userEdit.userid = this.loginInfoService.userid;
      this.userInfoService.editUser(this.userEdit).subscribe(
        data => {
          if (data.state_id) {
            alert('修改成功');
          } else {
            alert('修改失败');
          }
        }
      );
    }
  }
  // 验证
  public verification(): boolean {
    // username
    if (this.userEdit.username === '') {
      this.messages.error[1] = true;
      this.messages.errorMessages = '用户名为空';
      return false;
    } else if (!this.userEdit.username.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')) {
      this.messages.error[1] = true;
      this.messages.errorMessages = '用户名带有特殊字符';
      return false;
    } else if (this.userEdit.username.length < 2 || this.userEdit.username.length > 10) {
      this.messages.error[1] = true;
      this.messages.errorMessages = '用户名长度为2~10';
      return false;
    } else if (this.userEdit.password === '') {
            // password
      this.messages.error[2] = true;
      this.messages.errorMessages = '密码为空';
      return false;
    } else if (!this.userEdit.password.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')) {
      this.messages.error[2] = true;
      this.messages.errorMessages = '密码带有特殊字符';
      return false;
    } else if (this.userEdit.password.length < 2 || this.userEdit.password.length > 10) {
      this.messages.error[2] = true;
      this.messages.errorMessages = '密码长度2~10';
      return false;
    } else if (this.userEdit.e_mail === '') {
      this.messages.error[3]  = true;
      this.messages.errorMessages = '邮箱为空';
    } else if (!this.userEdit.e_mail.match('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$')) {
      // e_mail
      this.messages.error[3] = true;
      this.messages.errorMessages = '邮箱格式不正确';
      return false;
    } else if (this.userEdit.birthday === null) {
      this.messages.error[4] = true;
      this.messages.errorMessages = '请填写生日';
      return false;
    } else if (this.userEdit.grade === null) {
      this.messages.error[5] = true;
      this.messages.errorMessages = '请填写年级';
      return false;
    }  else {
       return true;
      }
  }
  // 错误信息清空
  public changByInput(count: number) {
    console.log(count);
    this.messages.error[count] = false;
    console.log(this.messages.error[count]);
    this.messages.errorMessages = '';
}
  public No() {
    this.userEdit = this.user;
    this.modalRef.hide();
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
    this.getUserInfo();
  }
  ngOnDestroy() {}
}
