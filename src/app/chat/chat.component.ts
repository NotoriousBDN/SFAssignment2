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

  constructor(private socketservice:SocketService) { }

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(){
    //this.socketservice.initSocket();
    this.ioConnection = this.socketservice.getMessage()
      .subscribe((message:any) => {
        this.messages.push(message);
      })
  }

  chat() {

    if(this.messagecontent) {
      this.socketservice.send(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log("no message");
    }
  }

  

}
