import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogService } from './userLogService';
import { UserLog } from '../interface/userLog.interface';
import { AuthService } from '../guard/AuthService';
import { of } from 'rxjs';
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
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css'],
  providers: [UserLogService]
})
export class UserLogComponent implements OnInit, AfterViewInit, OnDestroy {
  type = '4';
  userLogs: UserLog [];
  userLogsPage: UserLog [];
  pageAll: number;
  pageArry: number[];
  pageNew: number;
  pagination = {
    page: 0,
    count: 5
  };
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  constructor(private router: Router, private userLogService: UserLogService, private authService: AuthService,
              private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) {
    const url = navigateMap[type];
    console.log(type);
    if (url) {
        this.type = type;
        this.router.navigate([url]);
    }
  }
  // 得到所有的日志
  public search() {
    this.userLogService.search().subscribe(
      data => {
        this.userLogs = data.data;
        this.userLogsPage = this.userLogs.slice(0, 5);
        this.pageAll = Math.ceil(data.data.length / this.pagination.count);
        this.getPageArry(this.pageAll);
      }
    );
  }
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
    this.pagination.page = this.pagination.count * this.pageNew;
    this.userLogsPage = [];
    this.userLogsPage =  this.userLogs.slice(this.pagination.page, this.pagination.page + this.pagination.count);
  }
  // 导出log
  public outLog() {
    // 得到数据
    const data = this.userLogs;
    console.log(data);
    // 头文件格式
    let csv = '\ufeff';
    // 头标题
    const columnsData = [
      'userid',
      'userName',
      'power',
      'log_datetime',
    ];
    // 遍历
    for (let i = 0; i < columnsData.length; i++) {
      // 行
      const column = columnsData[i];
      // csv+= userid
      csv += '"' + column + '"';
      if ( i < (columnsData.length)) {
        csv += ',';
      }
    }
    // 判断是否为数组
    if (data) {
      data.forEach(
        (record) => {
          csv += '\n';
          for (let j = 0; j < columnsData.length; j++) {
            // 获得当前遍历行
            const column = columnsData[j];
            // 入栈
            csv += '"' + this.resolveFieldData(record, column) + '"';
            if (j < (columnsData.length)) {
              csv += ',';
            }
          }
        }
      );
    }
    const blob = new Blob([csv], {
      type:  'text/csv;charset=utf-8;'
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, '用户log表' + '.csv');
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', '用户log表' + '.csv');
        link.click();
      } else {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        window.open(encodeURI(csv));
      }
      document.body.removeChild(link);
    }
  }
  public resolveFieldData(data, field) {
    if (data && field) {
      // p判断是否为二维数组
      if (field.indexOf(',') === -1) {
        return data[field];
      } else {
        // 切割二维数组表头
          const fields = field.split(',');
          let value = data;
          for (let i = 0, len = fields.length; i < len; ++i) {
              if (value === null) {
                return null;
              }
              value = value[fields[i]];
          }
          return value;
      }
    } else {
      return null;
    }
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
