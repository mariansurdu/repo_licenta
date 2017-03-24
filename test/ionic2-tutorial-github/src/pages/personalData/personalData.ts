import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {PersonalDataService} from "./personalData.service";

@Component({
  selector: 'personalData',
  templateUrl: 'personalData.html'
})
export class PersonalData {
    data:any;
  constructor(public navCtrl: NavController,public personalDataService:PersonalDataService) {

  }
  public lineChartType:string = 'line';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 34, 55, 40], label: 'Gas'},
    {data: [10, 48, 40, 19, 86, 27, 90], label: 'Metan'},
    {data: [12, 48, 40, 19, 12, 27, 90], label: 'NH3'},
    {data: [60, 48, 40, 19, 22, 27, 90], label: 'CO'},
    {data: [35, 48, 40, 19, 52, 27, 90], label: 'CO2'}
  ];


  ngOnInit() {
  this.personalDataService
    .getData(1)
    .subscribe(value => this.data = value , error => alert(error) );
}


  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
