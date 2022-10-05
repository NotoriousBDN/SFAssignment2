import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {

  jsonItems = {};


  getUser(username: string) {
    let a = {username};
    return a;
  }

  getPassword(password: string) {
    let b = {password};
    return b;
  }

  getBoth(username: string, password: string) {
    let c = {'username': username, 'password': password};
    return c;
  }

  userValue = {};

}
