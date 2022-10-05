import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RoomViewComponent} from './room-view/room-view.component';
import {AdminComponent} from './admin/admin.component';
import {GroupsComponent} from './groups/groups.component';
import {ChatComponent} from './chat/chat.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent}, 
  {path:'roomView', component:RoomViewComponent},
  {path:'admin', component:AdminComponent},
  {path: 'group', component:GroupsComponent},
  {path: 'chat', component:ChatComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
