import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  controls = [
    'testName',
  ];
  errors = {
    minLength : '长度太短',
    required : '用户不能为空',
    maxLength : '超出长度',
  };
  message = {
    testName : {
      check : false,
      error : '',
    }
  };
  constructor(private fb: FormBuilder) {
    // console.log(111, this.profileForm);
  }
  get testName() {
    return this.testForm.get('firstName');
  }
  profileForm = new FormGroup({
    testName: new FormControl(''),
  });
  testForm = this.fb.group({
    testName: ['',
    [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(3),
  ]
]
  });
  ngOnInit() {

  }
  public errorClear(name: string) {
    this.message[name].error = '';
    console.log('点击事件触发:' + name + '错误事件清空');
    const x = 'minLength';
    console.log(this.errors[x]);
  }
  onclick() {
    const y = 'testName';
    console.log(this.testForm);
    console.log(this.testForm.get('testName'));
    const x = this.testForm.get('testName');
    for ( const name of this.controls ) {
      for (const error in x.errors ) {
        if ( error != null) {
          this.message[name].check = true;
          this.message[name].error += '" 请注意' + error + '错误"';
        }
      }
    }
  }
}
