import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor() { }

  getUsers(groupName: string) {
    let a = {groupName};
    return a;
  }

  userList: any;

  loggedIn: any;

}
