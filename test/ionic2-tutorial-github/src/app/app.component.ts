import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Create } from '../pages/create/create';
import { Functions } from '../pages/functions/functions';
import { Login } from '../pages/login/login';
import { PLanning } from '../pages/planning/planning';
import { Profile } from '../pages/profile/profile';
import {Settings} from "../pages/settings/settings";
import {PersonalData} from "../pages/personalData/personalData";
import { LocalStorageService } from 'angular-2-local-storage';
import {EventCompService} from "../pages/eventcomp/eventcomp.service";
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  public loggedUser:any;
 public title:String;
  loggedIn:Boolean;
  notloggedin:boolean;


  pages: Array<{title: string, component: any,loggedIn:Boolean}>;

  constructor(public platform: Platform,public localStorageService: LocalStorageService,public ev:EventCompService,public alertCtrl: AlertController) {
    this.initializeApp();
    this.ev.getEmittedValue()
      .subscribe((item) => {
        console.log(item);
        this.loggedIn=item;
        this.loggedUser=localStorageService.get("data");
        this.title="Welcome "+JSON.parse(this.loggedUser).name;
        this.pages = [
          { title: 'Home Page', component: HomePage,loggedIn:this.loggedIn },
          { title: 'Page One', component: Page1,loggedIn:!this.loggedIn },
          { title: 'Page Two', component: Page2,loggedIn:!this.loggedIn },
          { title: 'Create', component: Create,loggedIn:!this.loggedIn },
          { title: 'Login', component: Login,loggedIn:!this.loggedIn },
          { title: 'Functions', component: Functions,loggedIn:this.loggedIn },
          { title: 'PLanning', component: PLanning,loggedIn:this.loggedIn },
          { title: 'Profile', component: Profile,loggedIn:this.loggedIn },
          { title: 'Settings', component: Settings,loggedIn:this.loggedIn },
          { title: 'Personal Data', component: PersonalData,loggedIn:this.loggedIn }
        ];
        console.log(this.pages);
        alert("x")

      });
    this.loggedUser=localStorageService.get("data");
    if (this.loggedUser!=null) {
      this.loggedIn=true;
      this.title="Welcome "+JSON.parse(this.loggedUser).name;
      console.log(this.title);
    }
    else {
      this.loggedIn=false;
      this.title="Licenta";
    }
    console.log(this.loggedUser);
    this.pages = [
      { title: 'Home Page', component: HomePage,loggedIn:this.loggedIn },
      { title: 'Page One', component: Page1,loggedIn:!this.loggedIn },
      { title: 'Page Two', component: Page2,loggedIn:!this.loggedIn },
      { title: 'Create', component: Create,loggedIn:!this.loggedIn },
      { title: 'Login', component: Login,loggedIn:!this.loggedIn },
      { title: 'Functions', component: Functions,loggedIn:this.loggedIn },
      { title: 'PLanning', component: PLanning,loggedIn:this.loggedIn },
      { title: 'Profile', component: Profile,loggedIn:this.loggedIn },
      { title: 'Settings', component: Settings,loggedIn:this.loggedIn },
      { title: 'Personal Data', component: PersonalData,loggedIn:this.loggedIn }
    ];
    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Logout from Licenta',
      message: 'Do you agree to logout from Licenta?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }
  logout() {
    console.log("logout");
    this.localStorageService.remove("data");
    this.loggedIn=false;
    this.loggedUser=null;
    this.title="Licenta";
    this.pages = [
      { title: 'Home Page', component: HomePage,loggedIn:this.loggedIn },
      { title: 'Page One', component: Page1,loggedIn:!this.loggedIn },
      { title: 'Page Two', component: Page2,loggedIn:!this.loggedIn },
      { title: 'Create', component: Create,loggedIn:!this.loggedIn },
      { title: 'Login', component: Login,loggedIn:!this.loggedIn },
      { title: 'Functions', component: Functions,loggedIn:this.loggedIn },
      { title: 'PLanning', component: PLanning,loggedIn:this.loggedIn },
      { title: 'Profile', component: Profile,loggedIn:this.loggedIn },
      { title: 'Settings', component: Settings,loggedIn:this.loggedIn },
      { title: 'Personal Data', component: PersonalData,loggedIn:this.loggedIn }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
