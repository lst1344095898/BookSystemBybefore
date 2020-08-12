import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Routes, ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Subscription, of } from 'rxjs';
import { AdminOrUserService } from '../service/AdminOrUser.service';
import { AuthService } from '../guard/AuthService';
import { LoginInfoSerive } from '../service/loginInfo.Service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from '../interface/user.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  oneUser: any;
  loginflg = false;
  subscription: Subscription;
  LoginForm: FormGroup;
  // error = {
  //   errorPpassword: false,
  //   errorP: false,
  // };
  errorMessages: string;
  body = {
    username: '',
    password: ''
  };
  editUser: User;

  controls = [
    'userName',
    'password',
  ];
  errors = {
    minLength : '长度太短',
    required : '用户不能为空',
    maxLength : '超出长度',
  };
  message = {
    userName : {
      check : false,
      error : '',
    },
    password : {
      check : false,
      error : '',
    }
  };
  constructor(private service: LoginService, private router: Router,
              private route: ActivatedRoute, private adminOrUser: AdminOrUserService,
              private authService: AuthService, private loginInfoService: LoginInfoSerive,
              private fb: FormBuilder) { }
  // 给每个input定义control控制组件
  profileForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  public errorClear(name: string) {
    this.message[name].error = '';
    this.message[name].check = false;
    console.log('点击事件触发:' + name + '错误日志清空');
  }
  public FormValidation(): boolean {
    for ( const name of this.controls ) {
      const x = this.LoginForm.get(name);
      for (const error in x.errors) {
        if ( error != null ) {
          this.message[name].check = true;
          this.message[name].error += '"请注意'  + error + '错误"';
          return false;
        }
      }
    }
    return true;
  }
  // 自定义表单验证
  SpecialCharacters = (control: FormControl): {[s: string]: boolean} => {
    console.log('control.value' + control.value);
    let x = '';
    x += control.value;
    if (!control.value) {
      return {required: true };
    } else if (!x.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')) {
      console.log('true');
      return {format: true};
    }
}
// 初始化
  ngOnInit() {
    this.LoginForm = this.fb.group({
      userName: ['',
                [Validators.required,
                Validators.maxLength(10),
                Validators.minLength(2),
                this.SpecialCharacters
                 ]
      ],
      password: ['',
                [Validators.required,
                Validators.maxLength(10),
                Validators.minLength(2)]
              ]
    });
  }
  // 登录
  onClick() {
    if (this.FormValidation()) {
      // 获取input的值
      this.body.username = this.LoginForm.get('userName').value;
      this.body.password = this.LoginForm.get('password').value;
      console.log(this.body);
      // 调用登录服务
      this.service.login(this.body.username, this.body.password).subscribe(
        data => {
                console.log(data);
                if (!data.state_id) {
                alert('密码错误');
          } else {
                this.loginInfoService.storageId(data.data.userid);
                // 获得用户信息
                this.loginInfoService.setUser(data.data);
                console.log(this.loginInfoService.getUserId());
                if (data.data.user_code === '1') {
                  this.authService.login_On(true);
                  this.adminOrUser.switch(true);
                  this.router.navigate(['/details'], { queryParams: { userdata : data }});
                } else {
                  this.authService.login_On(false);
                  this.adminOrUser.switch(false);
                  this.router.navigate(['/userDetails'], { queryParams: {userdata : data}});
                }
          }
        });
    }
  }
  // 打开忘记密码模态框
  public changePassword() {
    const back = document.getElementById('back');
    const window = document.getElementById('emailWindow');
    back.style.display = 'block';
    window.style.display = 'block';
  }
  public e_mailJudge() {
    const back = document.getElementById('back');
    const window = document.getElementById('emailWindow');
    const passwordWindow = document.getElementById('passwordWindow');
    const eMail = document.getElementById('e_mailInput') as HTMLInputElement;
    const x = eMail.value;
    this.service.e_mailJudge(x).subscribe(
      data => {
        if (data.state_id === false && data.error != null) {
          alert(data.error); // 邮箱错误
        } else if (data.state_id && data.data != null) {
          this.editUser = data.data;
          window.style.display = 'none';
          passwordWindow.style.display = 'block';
        }
      }
    );
    console.log(x);
  }
  public editPassword() {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    const x = passwordInput.value;
    this.service.editPassword(this.editUser.userid, x).subscribe(
      data => {
          if (data) {
            alert('密码修改成功');
          } else {
            alert('修改失败');
          }
      }
    );
  }
  public cancel() {
    const back = document.getElementById('back');
    const window = document.getElementById('emailWindow');
    const passwordwindow = document.getElementById('passwordWindow');
    window.style.display = 'none';
    back.style.display = 'none';
    passwordwindow.style.display = 'none';
  }
  register() {
    this.router.navigate(['/register']);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
