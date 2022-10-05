import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {CheckUserService} from '../services/check-user.service';
import {GetGroupsService} from '../services/get-groups.service';
import {GetUsersService} from '../services/get-users.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
//const BACKEND_URL = 'https://s5217904.elf.ict.griffith.edu.au:3001';
// for angular http methods

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  role = '';
  
  userLogin = "";

  b = {};

  c = {};

  d = {};

  passwordTest = {};

  userInfo = {};

  userGroup = {};

  groupName = "";

  loggedIn = false;

  

  constructor(private router:Router, 
    private httpClient: HttpClient,
    private checkUserService: CheckUserService,
    private getGroupsService: GetGroupsService,
    private getUsersService: GetUsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    localStorage.clear();
  }

  getUser() {
    this.b = this.checkUserService.getBoth(this.username, this.password);
    console.log(this.passwordTest);
    this.httpClient.post(BACKEND_URL + '/getUser', this.b,  httpOptions)
    .subscribe((data:any)=>{
      this.checkUserService.userValue = (data);
      console.log(data);
      console.log(data.ok);
      if (data.ok == true){
        console.log("Correct Login Information");
        console.log(this.checkUserService.userValue);
        this.getGroup();
        localStorage.setItem('user', data.username);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('role', data.role);
        console.log(localStorage.getItem('loggedIn'));
        console.log(localStorage.getItem('user'));
        console.log(localStorage.getItem('role'));
      } else if (data.ok == false) {
        console.log("Incorrect Login Information");
        alert('Incorrect Username and Password Combination');
      }
    });
  }

  auth2() {
    console.log("AUTH CHECK");
    this.b = this.checkUserService.getBoth(this.username, this.password);
    this.httpClient.post(BACKEND_URL + '/auth2', this.b, httpOptions)
      .subscribe((data:any)=>{
        this.checkUserService.userValue = (data);
        console.log(data);
        console.log(data[0].role);
        if(data[0].ok == true) {
          console.log("Correct Login Information");
          console.log(this.checkUserService.userValue);
          this.getGroup2();
          localStorage.setItem('user', data[0].username);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('role', data[0].role);
          console.log(localStorage.getItem('loggedIn'));
          console.log(localStorage.getItem('user'));
          console.log(localStorage.getItem('role'));
        } else {
          console.log("Incorrect Login Information");
          alert('Incorrect Username and Password Combination');
        }
      });
  }

  getGroup() {
  this.c = this.getGroupsService.getGroup(this.username);
  this.httpClient.post(BACKEND_URL + '/getGroup', this.c,  httpOptions)
    .subscribe((data:any)=>{
      this.getGroupsService.groupList = data;
      console.log(data);
    });
  }

  getGroup2() {
    this.c = this.getGroupsService.getGroup(this.username);
    this.httpClient.post(BACKEND_URL + '/getGroup2', this.c,  httpOptions)
    .subscribe((data:any)=>{
      this.getGroupsService.groupList = data;
      console.log(data);
    });
  }

  getUsers() {
    this.d = this.getUsersService.getUsers(this.username);
    console.log(this.d);
    this.httpClient.post(BACKEND_URL + '/getUsers', this.d,  httpOptions)
    .subscribe((data:any)=>{
      alert("posting: " +JSON.stringify(this.d));
      alert("postRes: " +JSON.stringify(data));
      //alert("postRes: " +JSON.stringify(data));
      this.getUsersService.userList = data;
    });
  }

}
