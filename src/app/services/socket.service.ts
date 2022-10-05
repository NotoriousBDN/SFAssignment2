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
    //return ()=>{this.socket.disconnect();}
  }

  send(message: string){
    this.socket.emit('message', message);
  }

  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data: any[]) => {observer.next(data)
      });
    });
  }
}