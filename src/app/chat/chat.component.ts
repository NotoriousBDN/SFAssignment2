import { Component, OnInit } from '@angular/core';

import {SocketService} from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {GetGroupsService} from '../services/get-groups.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  //Variables used
  messagecontent:string | null = "";
  messages:string[] = [];
  ioConnection:any;
  username:string | null = "";
  roomname:string | null = "";
  join_room:string[] = [];
  groupList: string[] = [];
  roomList: string[] = [];
  groupname: string | null = "";
  selectedGroup: any;
  a: any;

  constructor(
    private socketservice:SocketService,
    private router: Router,
    private getGroupsService: GetGroupsService,
    ) { 

  }

  loggedOut = true;

  //Checks if user is logged in
  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.loggedOut = false;
      console.log("Logged In");
    } else {
      this.loggedOut = true;
      alert("Please Login");
      this.router.navigateByUrl("/login");
    }
    this.initIoConnection();
    console.log(localStorage.getItem('user'));
    this.username = localStorage.getItem('user');
    console.log(this.getGroupsService.groupList);
    console.log(this.groupList);
    this.a = this.getGroupsService.groupList;

  }

  //When join room button is pushed call JoinRoom from socket service
  joinRoom() {
    console.log(this.roomname);
    this.socketservice.joinRoom(this.roomname, this.username);
  }

  //Initialises connection as well as will push socket emits to the message array
  //Allowing them to be displayed on the page
  private initIoConnection(){
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

  //Will prevent the message from sending if either room or message are blank
  //Otherwise calls the send function from socket service
  chat() {
    if(this.messagecontent) {
      if (this.roomname == '') {
        console.log("No Room");
      } else {
        this.socketservice.send(this.messagecontent, this.username, this.roomname);
      this.messagecontent = null;
      }
    } else {
      console.log("no message");
    }
  }


  

}
