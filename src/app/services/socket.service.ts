import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';
//const SERVER_URL = 'https://s5217904.elf.ict.griffith.edu.au:3002';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket:any;
  constructor() {
    this.socket = io(SERVER_URL);
   }

  initSocket(){
    this.socket = io(SERVER_URL);
    //this.socket.emit("test-event", 1);
    //return ()=>{this.socket.disconnect();}
  }

  test(a:string){
    this.socket.emit("test-event", a);
  }

  joinRoom(roomname: string | null, username: string | null) {
    console.log(roomname);

    this.socket.emit('joinRoom', roomname, username, (message: any) => {
      this.getJoinRoom();
    });

    
  }

  getJoinRoom() {
    return new Observable(observer=>{
      this.socket.on('join_room', (data: any[]) => {observer.next(data)
      });
    });
  }

  send(message: string, username: string | null, room: string | null){
    console.log(localStorage.getItem('user'));
    //this.socket.emit("test-event", 1);
    this.socket.emit('message', message, username, room);
  }

  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data: any[]) => {observer.next(data)
      });
    });
  }
}