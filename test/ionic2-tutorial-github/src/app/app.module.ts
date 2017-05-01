import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LocalStorageModule } from 'angular-2-local-storage';
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
import {PlanningService} from "../pages/planning/planning.service";
import {SettingsService} from "../pages/settings/settings.service";
import {CreateService} from "../pages/create/create.service";
import {LoginService} from "../pages/login/login.service";
import {ItemView} from "../pages/itemView/itemview";
import {HomeService} from "../pages/home/homeservice";
import {Company} from "../pages/companyForm/company";
import {CompanyService} from "../pages/companyForm/company.service";
import {PersonalData} from "../pages/personalData/personalData";
import {PersonalDataService} from "../pages/personalData/personalData.service";
import {FunctionsService} from "../pages/functions/functions.service";
import {ProfileService} from "../pages/profile/profile.service";
import {EventCompService} from "../pages/eventcomp/eventcomp.service";
import {Push} from "@ionic-native/push";

//import {PersonalDetailsView} from "../pages/personDetailsView/personDetailsView";
import {TeamForm} from "../pages/teamForm/teamForm";
import {TeamFormService} from "../pages/teamForm/teamForm.service";
import {TeamView} from "../pages/teamView/teamview";
import {PersonToTeamForm} from "../pages/personToTeamForm/personToTeamForm";
import {MemberTeamView} from "../pages/memberTeamView/memberTeamView";
import {AppService} from "./app.service";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import { Flashlight } from '@ionic-native/flashlight';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Vibration } from '@ionic-native/vibration';
import {ImagePicker} from '@ionic-native/image-picker';
import { PhotoLibrary } from '@ionic-native/photo-library';



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
    Functions,
    HomePage,
    ItemView,
    Company,
    TeamForm,
    PersonalData,
    TeamView,
    PersonToTeamForm,
    MemberTeamView
  //  PersonalDetailsView

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
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
    Functions,
    HomePage,
    ItemView,
    Company,
    PersonalData,
    TeamForm,
    TeamView,
    PersonToTeamForm,
    MemberTeamView
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},PlanningService,SettingsService,CreateService,LoginService,HomeService,CompanyService,PersonalDataService,FunctionsService,ProfileService,EventCompService,TeamFormService,Push,AppService,SpinnerDialog,Flashlight,SMS,LocalNotifications,PhotoViewer,Vibration,
    ImagePicker,PhotoLibrary]
})
export class AppModule {}
