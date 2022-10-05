import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
const BACKEND_URL = 'http://localhost:3000';
//const BACKEND_URL = 'https://s5217904.elf.ict.griffith.edu.au:3001';

import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit {

  constructor(
    private router: Router, 
    private httpClient: HttpClient
  ) { }

  loggedOut = true;

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.loggedOut = false;
      console.log("Logged In");
    } else {
      this.loggedOut = true;
      alert("Please Login");
      this.router.navigateByUrl("/login");
    }
  }



}
