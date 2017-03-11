import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {LoginService} from "./login.service";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController,public loginService:LoginService) {

  }

  login(email,password) {
    console.log(email);
    console.log(password);
      this.loginService.login(email,password);
  }

}
