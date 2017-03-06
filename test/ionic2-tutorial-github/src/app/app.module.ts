import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {PLanning} from "../pages/planning/planning";
import {Settings} from "../pages/settings/settings";
import {Profile} from "../pages/profile/profile";
import {Create} from "../pages/create/create";
import {Login} from "../pages/login/login";
import {Functions} from "../pages/functions/functions";
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page1,
    Page2,
    Login,
    Create,
    Profile,
    Settings,
    PLanning,
    Functions
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page1,
    Page2,
    Login,
    Create,
    Profile,
    Settings,
    PLanning,
    Functions
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
