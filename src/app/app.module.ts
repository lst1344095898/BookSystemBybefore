import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './register/register.component';
import { BookManagementComponent } from './book_management/book_management.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { UserLogComponent } from './user-log/user-log.component';
import { TopComponent } from './top/top.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AdminOrUserService } from './service/AdminOrUser.service';
import { AuthService } from './guard/AuthService';
import { LoginInfoSerive } from './service/loginInfo.Service';
import { HomeComponent } from './home/home.component';
import { CheckService } from './service/check.Service';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserBookShelfComponent } from './user-book-shelf/user-book-shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    RegisterComponent,
    BookManagementComponent,
    ReturnBookComponent,
    UserLogComponent,
    TopComponent,
    UserDetailsComponent,
    UserInfoComponent,
    HomeComponent,
    UserManagementComponent,
    UserBookShelfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BootstrapModalModule,
    ModalModule.forRoot()

  ],
  providers: [BsModalService, AdminOrUserService, AuthService, LoginInfoSerive, CheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
