import { Component, OnInit, TemplateRef, Renderer2, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Book } from '../interface/book.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { BookManagementService } from './book_management.service';
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
  selector: 'app-book-management',
  templateUrl: './book_management.component.html',
  styleUrls: ['./book_management.component.css'],
  providers: [BookManagementService]
})
export class BookManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  userid = '';
  bookid = '';
  authorName = '';
  bookName = '';
  educationName = '';
  quantity = 0;
  off: boolean;
  // 图示信息容器
  books: Array<Book>;
  booksPage: Book[];
  pageAll: number;
  pageArry: number[];
  userInfoHeard = {
    username: '',
    grade: 0,
    user_code: '',
  };
  pageNew = 0;
  type = '3'; // 页面跳转状态码
  bookInfo = {
    bookid: '',
    authorName: '',
    bookName: '',
    educationName: '',
    quantity: 0
  };
  selectedBook: Book; // 模态框图书信息容器
  modalRef: BsModalRef; // 模态框对象
  // targetBook: Book; // 保存新的图书信息对象
  x = 0; // 新增还是修改判断
  loginfig: false;
  pagination = {
    page: 0,
    count: 5
  };
  pram = {
    page: 0,
    count: 5,
    bookid: '',
    authorName: '',
    bookName: '',
    educationName: '',
    quantity: 0
  };
  error = { // 表单错误信息表
    book_id : {
        emty: true,
    },
    authorName : {
        emty: true,
    },
    bookName : {
        emty: true,
    },
    educationName : {
        emty: true,
    },
    quantity : {
        emty: true,
    }
};
booksByParm: Book[];
  constructor(private renderer: Renderer2, private router: Router,
              private bookManagementService: BookManagementService,
              private modalService: BsModalService, private el: ElementRef,
              private authService: AuthService, private loginInfoService: LoginInfoSerive) { }
  public tagClick(type) { // 页面跳转函数
    this.type = type;
    const url = navigateMap[type];
    console.log(url);
    if (url) {
        this.router.navigate([url]);
    }
  }
  // 后台分页
  public searchByPram() {
    console.log('test1 ' + this.pram);
    this.pram.page = 0;
    this.bookManagementService.searchByPram(this.pram).subscribe(
      data => {
        this.booksByParm = data.data;
        // 所有的页数
        console.log(data);
        this.pageAll = Math.ceil(data.pages / this.pram.count);
        console.log(this.pageAll);
        this.getPagArry(this.pageAll);
        console.log(this.booksByParm);
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
  // 翻页
  public changPageByAfter(page: number) {
      console.log(page);
      this.pageNew = page;
      this.pram.page = this.pageNew * this.pram.count;
      this.bookManagementService.searchByPram(this.pram).subscribe(
        data => {
          this.booksByParm = data.data;
          this.pageAll = Math.ceil(data.pages / this.pram.count);
          console.log(this.pageAll);
          this.getPagArry(this.pageAll);
          console.log(this.booksByParm);
        }
      );
  }
  public insert(template: TemplateRef<any>) { // 添加数据函数
    this.selectedBook = { // 模态框无数信息容器
        bookid: '',
        authorName: '',
        bookName: '',
        educationName: '',
        quantity: 0
    };
    // this.targetBook = {
    //     bookid: '',
    //     authorName: '',
    //     bookName: '',
    //     educationName: '',
    //     quantity: 0
    // };
    this.off = false;
    this.x = 0; // 判断是否为新增还是修改
    this.modalRef = this.modalService.show(template); // 传值并显现
  }
  public edit(template: TemplateRef<any>, book: Book) { // 修改函数
    // this.targetBook = book;
    this.selectedBook = { // 将当前图书信息存到模态框
        bookid: book.bookid,
        authorName: book.authorName,
        bookName: book.bookName,
        educationName: book.educationName,
        quantity: book.quantity
    };
    this.off = true;
    // this.renderer.setAttribute(this.el.nativeElement, 'ng-readonly', 'true');
    this.x = 1;
    this.modalRef = this.modalService.show(template);
}
change(): void { // input内容改变触发错误信息更新
  this.error.book_id.emty = true;
  this.error.bookName.emty = true;
  this.error.educationName.emty = true;
  this.error.quantity.emty = true;
  this.error.authorName.emty = true;
  return;
}
public save() { // 保存函数
   console.log(this.selectedBook);
   if (this.selectedBook.bookid === '') {  // 判断输入条件是否成立如果不成立就改变状态
      this.error.book_id.emty = false;
      return;
   } else if (this.selectedBook.bookName === '' ) {
      this.error.bookName.emty = false;
      return;
   } else if (this.selectedBook.authorName === '') {
      this.error.authorName.emty = false;
      return;
   } else if (this.selectedBook.educationName === '') {
      this.error.educationName.emty = false;
      return;
   } else if (this.selectedBook.quantity === 0) {
      this.error.quantity.emty = false;
      return;
   } else {
      this.modalRef.hide(); // 隐藏模态框
      // console.log('id' + this.targetBook.bookid);
      console.log('x' + this.x);
      if (this.x === 1) { // 判断是否为新增还是修改///修改
          this.bookManagementService.updata(this.selectedBook).subscribe(
            data => {
              if (data.state_id === true) {
                alert('更新成功');
                // this.targetBook = this.selectedBook;
              } else {
                alert ('更新失败，请检查格式和网络');
              }
            });
      } else {
          console.log(this.selectedBook);
          this.bookManagementService.add(this.selectedBook).subscribe(
            data => {
                      if (!data) {
                          alert('注册失败');
                      } else {
                        alert('YES');
                      }
            }
          ); // 调用数据库
      }
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
  ngAfterViewInit() {
    // this.search();
    this.searchByPram();
  }
  ngOnDestroy() {}
}
