import {
  Component, ViewChild, forwardRef, ContentChild, QueryList, ContentChildren, Output,
  EventEmitter
} from '@angular/core';

import {NavController, Nav} from 'ionic-angular';
import {LoginService} from "./login.service";
import {Settings} from "../settings/settings";
import {HomePage} from "../home/home";
import { LocalStorageService } from 'angular-2-local-storage';
import {MyApp} from "../../app/app.component";
import {EventCompService} from "../eventcomp/eventcomp.service";


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {
  @ViewChild(Nav) nav: Nav;



  constructor(public navCtrl: NavController,public loginService:LoginService,private localStorageService: LocalStorageService,public ev:EventCompService) {

  };
  email:String;
  password:String;
  login() {
    alert("1"+this.email);
    //this.localStorageService.get("tempToken").toString()
    this.loginService.login(this.email,this.password,null).subscribe((res)=>{
      console.log(res);
      alert(res.status);
      if(res.status==200) {
        this.localStorageService.set("data",res._body);
        this.navCtrl.push(HomePage);
        this.ev.sendOk1({flagEv:"login",another:true});
      }
      else {
        alert("Login unsuccesfull");
      }
    });
  }

}
