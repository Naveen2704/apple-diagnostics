import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  userInfo: any = [];
  constructor() { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }



}
