import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
//const BACKEND_URL = 'https://s5217904.elf.ict.griffith.edu.au:3001';

import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { Userobj } from '../userobj';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userid = 0;
  username = "";
  useremail = "";
  userrole = 0;
  groupname = "";
  roomname = "";
  a = 0;

  loggedOut = true;
  role0 = false;
  role1 = false;
  role2 = false;
  role3 = false;

  constructor(
    private router: Router, 
    private httpClient: HttpClient) 
    { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.loggedOut = false;
      console.log("Logged In");
      this.role0 = true;
    } else {
      this.loggedOut = true;
      alert("Please Login");
      this.router.navigateByUrl("/login");
    }
    if (localStorage.getItem('role') == '0') {
      console.log("Role = 0");
      this.role0 = true;
      this.role1 = false;
      this.role2 = false;
      this.role3 = false;
    } else if (localStorage.getItem('role') == '1') {
      console.log("Role = 1");
      this.role0 = false;
      this.role1 = true;
      this.role2 = false;
      this.role3 = false;
    } else if (localStorage.getItem('role') == '2') {
      console.log("Role = 2");
      this.role0 = false;
      this.role1 = false;
      this.role2 = true;
      this.role3 = false;
    } else if (localStorage.getItem('role') == '3') {
      console.log("Role = 3");
      this.role0 = false;
      this.role1 = false;
      this.role2 = false;
      this.role3 = true;

    }
  }
    


  createUser() {
    let userobj = {
      'userid': this.userid,
      'username': this.username, 
      'useremail': this.useremail, 
      'userrole': this.userrole
    }
    console.log(userobj);
    console.log(userobj.userrole);
    console.log(Number(localStorage.getItem('role')));

    if (Number(localStorage.getItem('role')) > userobj.userrole || Number(localStorage.getItem('role')) == 3) {
      console.log("Works");
      this.httpClient.post<Userobj[]>(BACKEND_URL + '/createUser', userobj,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
    } else {
      alert("You do not have permission to give that role");
    }
  }

  editUser() {
    let userobj = {
      'userid': this.userid,
      'username': this.username, 
      'useremail': this.useremail, 
      'userrole': this.userrole
    }
    console.log(userobj);
    if (Number(localStorage.getItem('role')) > userobj.userrole || Number(localStorage.getItem('role')) == 3) {
      console.log("Works");
      this.httpClient.post<Userobj[]>(BACKEND_URL + '/createUser', userobj,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
    } else {
      alert("You do not have permission to give that role");
    }
  }

  deleteUser() {
    let username = {'username': this.username};
    console.log(username);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/deleteUser', username,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

  createGroup() {
    let groupname = {'groupname': this.groupname};
    console.log(groupname);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/createGroup', groupname,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

  createRoom() {
    let groupInfo = {
      'groupname': this.groupname,
      'roomname': this.roomname
    }
    console.log(groupInfo);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/createRoom', groupInfo,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

  addUserGroup() {
    let groupInfo = {
      'groupname': this.groupname,
      'user': this.username
    }
    console.log(groupInfo);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/addUserGroup', groupInfo,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

  deleteGroup() {
    let groupname = {'groupname': this.groupname};
    console.log(groupname);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/deleteGroup', groupname,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

  deleteRoom() {
    let groupInfo = {
      'groupname': this.groupname,
      'roomname': this.roomname
    }
    console.log(groupInfo);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/deleteRoom', groupInfo,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

  removeUserGroup() {
    let groupInfo = {
      'groupname': this.groupname,
      'user': this.username
    }
    console.log(groupInfo);
    this.httpClient.post<Userobj[]>(BACKEND_URL + '/removeUserGroup', groupInfo,  httpOptions)
      .subscribe((m: any) => {alert(JSON.stringify(m));});
  }

}
