import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {PersonalDataService} from "../personalData/personalData.service";

@Component({
  selector: 'memberTeamView',
  templateUrl: 'memberTeamView.html'
})
export class MemberTeamView {
  selectedItem:any;
  data:any;
  worker:any=false;
  teamleader:any=false;
  labels:any=[];
  arrayGas:any=[];
  arrayMetan:any=[];
  arrayNH3:any=[];
  arrayCO:any=[];
  arrayCO2:any=[];
  arrayAirQuality:any=[];
  timeStarts:any=[];
  localData:any=JSON.parse(localStorage.getItem("my-app.data"));
  public lineChartType:string = 'line';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public days:any=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];


  public barChartLabels:string[] = this.labels;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0,0,0,0,0,0,0], label: 'Gas'},
    {data: [0,0,0,0,0,0,0], label: 'Metan'},
    {data: [0,0,0,0,0,0,0], label: 'NH3'},
    {data: [0,0,0,0,0,0,0], label: 'CO'},
    {data: [0,0,0,0,0,0,0], label: 'CO2'},
    {data: [0,0,0,0,0,0,0], label: 'Air quality'}
  ];
  constructor(public navCtrl: NavController,public navParams:NavParams,public personalDataService:PersonalDataService) {
    this.selectedItem=navParams.get('item');
    this.timeStarts=new Date("MMM-DD-YYYY");
    console.log(JSON.parse(this.localData).personType);
    if (JSON.parse(this.localData).personType==1) {
      this.teamleader=true;
    }
    if (JSON.parse(this.localData).personType==2) {
      this.worker=true;
    }
  }


  ngOnInit() {
    if (this.teamleader) {
    this.personalDataService
      .getData(1)
      .subscribe((res) => {
        console.log(res);
        this.data = res[0].dataUser[0].airquality;
        for (var i = 0; i < res[0].dataUser.length; i++) {
          this.arrayAirQuality.push(res[0].dataUser[i].airquality);
          this.arrayMetan.push(res[0].dataUser[i].metan);
          this.arrayCO.push(res[0].dataUser[i].co);
          this.arrayCO2.push(res[0].dataUser[i].co2);
          this.arrayNH3.push(res[0].dataUser[i].nh3);
          this.arrayGas.push(res[0].dataUser[i].gas);
          this.labels.push(this.days[new Date(res[0].dataUser[i].date).getDay() - 2]);

        }
        this.barChartData = [
          {data: this.arrayGas, label: 'Gas'},
          {data: this.arrayMetan, label: 'Metan'},
          {data: this.arrayNH3, label: 'NH3'},
          {data: this.arrayCO, label: 'CO'},
          {data: this.arrayCO2, label: 'CO2'},
          {data: this.arrayAirQuality, label: 'Air quality'}
        ];
        console.log(this.barChartData);
        this.barChartLabels = ["2", "3"];
        console.log(this.barChartLabels);

      });
  }
  else {
      console.log("Not a teamleader!");
    }
}

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
