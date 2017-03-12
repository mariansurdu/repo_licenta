import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'itemview',
  templateUrl: 'itemview.html'
})
export class ItemView {
  selectedItem:any;
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.selectedItem=navParams.get('item');
  }

}
