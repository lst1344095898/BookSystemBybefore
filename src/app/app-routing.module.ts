import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './register/register.component';
import { BookManagementComponent } from './book_management/book_management.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { UserLogComponent } from './user-log/user-log.component';
import { TopComponent } from './top/top.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginGuard } from './guard/login.guard';
import { AdminGuard } from './guard/admin.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserBookShelfComponent } from './user-book-shelf/user-book-shelf.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'details',
  component: DetailsComponent, canActivate: [AdminGuard]
},
{
  path: 'book_management',
  component: BookManagementComponent, canActivate: [AdminGuard]
},
{
  path: 'returnBook',
  component: ReturnBookComponent, canActivate: [AdminGuard]
},
{
  path: 'userLog',
  component: UserLogComponent, canActivate: [AdminGuard]
},
{
  path: 'Top',
  component: TopComponent
},
{
  path: 'userDetails',
  component: UserDetailsComponent,  canActivate: [LoginGuard]
},
{
  path: 'userInfo',
  component: UserInfoComponent, canActivate: [LoginGuard]
},
{
  path: 'user_management',
  component: UserManagementComponent, canActivate: [AdminGuard]
},
{
  path: 'userBookShelf',
  component: UserBookShelfComponent, canActivate: [LoginGuard]
},
{
  path: 'home',
  component: HomeComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
