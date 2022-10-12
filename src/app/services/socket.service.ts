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
  }


  //Parameters of room name and username
  //Will emit a message when a user joins a room
  //Will also retrive the oberservable so it is displayed
  joinRoom(roomname: string | null, username: string | null) {
    console.log(roomname);
    this.socket.emit('joinRoom', roomname, username, (message: any) => {
      this.getJoinRoom();
    });
  }

  //An observable to display a message when a room is left
  getLeftRoom() {
    return new Observable(observer=>{
      this.socket.on('leftRoom', (data: any[]) => {observer.next(data)
      });
    });
  }

  //An observable to display a message when a room is joined
  getJoinRoom() {
    return new Observable(observer=>{
      this.socket.on('join_room', (data: any[]) => {observer.next(data)
      });
    });
  }

  //Parameters: message, username and room
  //Will emit a message to server side socket
  send(message: string, username: string | null, room: string | null){
    this.socket.emit('message', message, username, room);
  }

  //An observable to display a message
  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data: any[]) => {observer.next(data)
      });
    });
  }
}