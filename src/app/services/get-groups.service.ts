import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetGroupsService {

  constructor() { }

  getGroup(username: string) {
    //getGroup.js works with submit() to return user's groups
    let a = {username};
    return a;
  }
  
  groupList: any;
}
