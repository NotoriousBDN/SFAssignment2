import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
//const BACKEND_URL = 'https://s5217904.elf.ict.griffith.edu.au:3001';

import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import {CheckUserService} from '../services/check-user.service';
import {GetGroupsService} from '../services/get-groups.service';
import {GetUsersService} from '../services/get-users.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    private checkUserService: CheckUserService,
    private getGroupsService: GetGroupsService,
    private getUsersService: GetUsersService
  ) { }

  loggedOut = true;
  test = (this.checkUserService.userValue);
  test1 = JSON.stringify(this.checkUserService.userValue);

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.loggedOut = false;
      console.log("Logged In");
      console.log(this.test);
      console.log(this.test1)
    } else {
      this.loggedOut = true;
      alert("Please Login");
      this.router.navigateByUrl("/login");
    }
  }


}
