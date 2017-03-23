import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {

  constructor(public navCtrl: NavController) {

  }

  public options:any = {
  background: {
    url: "http://media.caranddriver.com/images/media/51/2017-10best-lead-photo-672628-s-original.jpg",
  },
  img: {
    url: "http://wallpaper-gallery.net/images/cars/cars-13.jpg"
  },
  name: {
    text: "Marian Surdu"
  }
}

}
