import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { Routes, ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Subscription, of } from 'rxjs';
import { User } from '../interface/user.interface';
import { CheckService } from '../service/check.Service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  oneUser: any;
  loginflg = false;
  subscription: Subscription;
  errorMessage: string;
  passwordChick = '';
  registerForm: FormGroup;
  interest = '';
  registerInfo = {
    userid: '',
    username: '',
    password: '',
    e_mail: '',
    birthday: '',
    sex: '',
    grade: '',
    user_code: '',
    interest: '',
    introduce: ''
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
      introduce: false,
      passwordChick: false
    },
    errorMessages: ''
};
controls = [
  'username',
  'password',
  'passwords',
  'email',
  'birthday',
  'grade',
  'user_code',
  'sex',
  'introduce',
];
errors = {
  minLength : '长度太短',
  required : '用户不能为空',
  maxLength : '超出长度',
  email: 'email格式不正确'
};
message = {
  username : {
    check : false,
    error : '',
  },
  password : {
    check : false,
    error : '',
  },
  passwords : {
    check : false,
    error : '',
  },
  email : {
    check : false,
    error : '',
  },
  birthday : {
    check : false,
    error : '',
  }
  ,
  grade : {
    check: false,
    error : '',
  },
  user_code : {
    check: false,
    error: '',
  },
  sex : {
    check: false,
    error: '',
  },
  interest: {
    check: false,
    error: '',
  },
  introduce : {
    check: false,
    error: '',
  }
};
  constructor(private service: RegisterService, private router: Router, private route: ActivatedRoute,
              private checkService: CheckService, private fb: FormBuilder) { }
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    birthday: new FormControl(''),
    grade: new FormControl(''),
    user_code: new FormControl(''),
    sex: new FormControl(''),
    introduce: new FormControl(''),
  });
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
  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [
                Validators.required,
                Validators.maxLength(10),
                Validators.minLength(3),
                this.SpecialCharacters,
                ]],
      password: ['', [
                Validators.required,
                Validators.maxLength(10),
                Validators.minLength(3), ]],
      passwords: ['',
                Validators.required, ],
      email: ['', [
                Validators.required,
                Validators.maxLength(20),
                Validators.minLength(3),
                Validators.email ]],
      birthday: ['',
                Validators.required, ],
      grade: ['', Validators.required, ],
      user_code: ['', Validators.required, ],
      sex: ['', Validators.required, ],
      introduce: ['', Validators.maxLength(20)]
    });
  }
  public errorClear(name: string) {
    this.message[name].error = '';
    this.message[name].check = false;
    console.log('点击事件触发:' + name + '错误日志清空');
  }
  public FormValidation(): boolean {
    for ( const name of this.controls ) {
      const x = this.registerForm.get(name);
      if ( name === 'passwords' && x.value !== '') {
          if (x.value !== this.registerForm.get('password').value) {
            this.message[name].check = true;
            this.message[name].error += '两次密码不一致';
            return false;
          }
      }
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

  // 注册
  onClick() {
    if (this.FormValidation()) {
      // 赋值 赋值
      this.assignment();
      this.service.register(this.registerInfo).subscribe(
        data => {
          if (data.state_id === false && data.error === null) {
                  alert('注册失败原因未知');
          } else if (data.state_id === false && data.error != null) {
                  alert(data.error);
          } else {
            alert('注册成功');
            this.router.navigate(['/login']);
          }
        });
      console.log(this.registerInfo);
    }
  }
  public assignment() {
    for (const name of this.controls) {
      // 筛选确认密码
      if (name !== 'passwords') {
        this.registerInfo[name] = this.registerForm.get(name).value;
      }
    }
    this.registerInfo.interest = this.interest;
  }
  public changByInput(count: number) {
    console.log(count);
    this.messages.error[count] = false;
    console.log(this.messages.error[count]);
    this.messages.errorMessages = '';
}
  public goback() {
    this.router.navigate(['/login']);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
