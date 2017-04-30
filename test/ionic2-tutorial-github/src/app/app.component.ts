
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
import {Push,PushObject,PushOptions} from "@ionic-native/push";
import {AppService} from "./app.service";

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

  constructor(public platform: Platform,public push:Push,public localStorageService: LocalStorageService,public ev:EventCompService,public alertCtrl: AlertController,public appService:AppService) {
    this.initializeApp();
    this.ev.getEmittedValue()
      .subscribe((item) => {
        if (item.flagEv==="login" || item.flagEv==="create") {
          console.log(item);
          this.loggedIn = item.another;
          this.loggedUser = localStorageService.get("data");
          this.title = "Welcome " + JSON.parse(this.loggedUser).name;
          this.pages = [
            {title: 'Home Page', component: HomePage, loggedIn: this.loggedIn},
            {title: 'Page One', component: Page1, loggedIn: !this.loggedIn},
            {title: 'Page Two', component: Page2, loggedIn: !this.loggedIn},
            {title: 'Create', component: Create, loggedIn: !this.loggedIn},
            {title: 'Login', component: Login, loggedIn: !this.loggedIn},
            {title: 'Functions', component: Functions, loggedIn: this.loggedIn},
            {title: 'PLanning', component: PLanning, loggedIn: this.loggedIn},
            {title: 'Profile', component: Profile, loggedIn: this.loggedIn},
            {title: 'Settings', component: Settings, loggedIn: this.loggedIn},
            {title: 'Personal Data', component: PersonalData, loggedIn: this.loggedIn}
          ];
          console.log(this.pages);
          alert("x")
        }
      });
    this.loggedUser=localStorageService.get("data");
    alert(this.loggedUser);
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
      this.initPushNotification();
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
  initPushNotification() {
    alert("init"+this.loggedIn);
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: "612626546416"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {

      console.log("device token ->", data.registrationId);
      this.localStorageService.add("tempToken",data.registrationId);
      alert(data.registrationId+this.loggedIn);
      if (this.loggedIn) {
        alert("User-ul este logat si update token");
        this.appService.updateToken({userId: this.loggedUser._id, token: data.registrationId}).subscribe((res)=> {
          if (res.status == 200) {
            alert("Token updated successfully");
          }
        })
      }
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      alert('x');
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
             // this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //this.nav.push(DetailsPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

