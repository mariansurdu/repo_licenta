import {Component} from "@angular/core";
import {ViewChild, ElementRef} from '@angular/core';

import {NavController, AlertController, NavParams} from 'ionic-angular';
@Component({
  selector: 'page-resume-view',
  templateUrl: "resumeView.html",
})
export class ResumeView {
  pdfUrl : String;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumeView');
    this.pdfUrl = this.navParams.get('pdfUrl');
  }

}
