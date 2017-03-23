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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Create', component: Create },
      { title: 'Login', component: Login },
      { title: 'Functions', component: Functions },
      { title: 'PLanning', component: PLanning },
      { title: 'Profile', component: Profile },
      { title: 'Settings', component: Settings },
      { title: 'Personal Data', component: PersonalData }
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
