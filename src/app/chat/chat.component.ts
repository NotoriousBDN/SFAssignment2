import { Component, OnInit } from '@angular/core';

import {SocketService} from '../services/socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent:string | null = "";
  messages:string[] = [];
  ioConnection:any;
  username:string | null = "";
  roomname:string | null = "";
  join_room:string[] = [];

  constructor(private socketservice:SocketService) { 

  }

  ngOnInit(): void {
    this.initIoConnection();
    console.log(localStorage.getItem('user'));
    this.username = localStorage.getItem('user');
  }

  joinRoom() {
    console.log(this.roomname);
    this.socketservice.joinRoom(this.roomname, this.username);
  }

  private initIoConnection(){
    this.socketservice.test("User Has Joined the Channel");
    this.ioConnection = this.socketservice.getJoinRoom()
      .subscribe((join_room:any) => {
        console.log('running');
        console.log(join_room);
        this.messages.push(join_room)
      })
    this.ioConnection = this.socketservice.getMessage()
      .subscribe((message:any) => {
        this.messages.push(message);
      })
    this.ioConnection = this.socketservice.getLeftRoom()
      .subscribe((leftRoom:any) => {
        this.messages.push(leftRoom);
      })
  }

  chat() {

    if(this.messagecontent) {
      this.socketservice.send(this.messagecontent, this.username, this.roomname);
      this.messagecontent = null;
    } else {
      console.log("no message");
    }
  }


  

}
