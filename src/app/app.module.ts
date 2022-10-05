import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './services/socket.service';
import { AdminComponent } from './admin/admin.component';
import { GroupsComponent } from './groups/groups.component';
import { RoomViewComponent } from './room-view/room-view.component';
// import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    AdminComponent,
    GroupsComponent,
    RoomViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule // for http method
  ],
  providers: [SocketService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
