import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {PersonalDataService} from "./personalData.service";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'personalData',
  templateUrl: 'personalData.html'
})
export class PersonalData {
    data:any;
  auxData:any
  labels:any=[];
  labels1:any=[];
  arrayGas:any=[];
  arrayMetan:any=[];
  arrayNH3:any=[];
  arrayCO:any=[];
  arrayCO2:any=[];
  selectedDate:any;
  arrayAirQuality:any=[];
  arrayGas1:any=[];
  arrayMetan1:any=[];
  arrayNH31:any=[];
  arrayCO1:any=[];
  arrayCO21:any=[];
  arrayAirQuality1:any=[];
  timeStarts:any=[];
  loggedUser:any=this.localStorageService.get("data");
  constructor(public navCtrl: NavController,public personalDataService:PersonalDataService,public localStorageService:LocalStorageService) {
      this.timeStarts=new Date("MMM-DD-YYYY");
  }
  public lineChartType:string = 'line';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartType1:string = 'line';
  public barChartOptions1:any = {
    scaleShowVerticalLines1: false,
    responsive: true
  };
  public days:any=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];


  public barChartLabels:string[] = this.labels;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartLabels1:string[] = this.labels1;
  public barChartType1:string = 'bar';
  public barChartLegend1:boolean = true;

  public barChartData:any[] = [
  {data: [0,0,0,0,0,0,0], label: 'Gas'},
  {data: [0,0,0,0,0,0,0], label: 'Metan'},
  {data: [0,0,0,0,0,0,0], label: 'NH3'},
  {data: [0,0,0,0,0,0,0], label: 'CO'},
  {data: [0,0,0,0,0,0,0], label: 'CO2'},
  {data: [0,0,0,0,0,0,0], label: 'Air quality'}
];
  public barChartData1:any[] = [
    {data: [0,0,0,0,0,0,0], label: 'Gas'},
    {data: [0,0,0,0,0,0,0], label: 'Metan'},
    {data: [0,0,0,0,0,0,0], label: 'NH3'},
    {data: [0,0,0,0,0,0,0], label: 'CO'},
    {data: [0,0,0,0,0,0,0], label: 'CO2'},
    {data: [0,0,0,0,0,0,0], label: 'Air quality'}
  ];


  dateConverter(date:any) {

    let date1=new Date(date);
    let yminutes=""
    var hours=date1.getHours()+3;
    var minutes=date1.getMinutes();
    if (minutes<10)
      yminutes=0+""+minutes.toString();
    else
      yminutes=minutes+"";
    var x=hours+":"+yminutes;
    return x;

  }
  ngOnInit() {

  this.personalDataService
    .getData(JSON.parse(this.loggedUser)._id)
    .subscribe((res)=>{

      console.log(res);
      this.data=res[0].dataUser[0].airquality;
      console.log(res[0].dataUser);

      for (var i=0;i<res[0].dataUser.length;i++)
      {
        this.arrayAirQuality.push(res[0].dataUser[i].airquality);
        this.arrayMetan.push(res[0].dataUser[i].metan);
        this.arrayCO.push(res[0].dataUser[i].co);
        this.arrayCO2.push(res[0].dataUser[i].co2);
        this.arrayNH3.push(res[0].dataUser[i].nh3);
        this.arrayGas.push(res[0].dataUser[i].gas);
        this.labels.push(this.days[new Date(res[0].dataUser[i].date).getDay()-2]);
        }
      this.barChartData=[
        {data: this.arrayGas, label: 'Gas'},
        {data: this.arrayMetan, label: 'Metan'},
        {data: this.arrayNH3, label: 'NH3'},
        {data: this.arrayCO, label: 'CO'},
        {data: this.arrayCO2, label: 'CO2'},
        {data: this.arrayAirQuality, label: 'Air quality'}
      ];
      console.log(this.barChartData);
      this.barChartLabels=["2","3"];
      console.log(this.barChartLabels);

    });
}
getStatistics() {
    this.personalDataService.getStatistics(this.selectedDate,JSON.parse(this.loggedUser)._id).subscribe((res)=> {
      console.log((JSON.parse(res._body)));
      this.auxData = JSON.parse(res._body);
      if (this.auxData.length == 0) {
        this.labels1=[];
        this.arrayAirQuality1 = [];
        this.arrayMetan1 = [];
        this.arrayCO1 = [];
        this.arrayCO21 = [];
        this.arrayNH31 = [];
        this.arrayGas1 = [];

        for (var i = 0; i < 3; i++) {
          this.arrayAirQuality1.push(0);
          this.arrayMetan1.push(0);
          this.arrayCO1.push(0);
          this.arrayCO21.push(0);
          this.arrayNH31.push(0);
          this.arrayGas1.push(0);
          this.labels1.push('-');
        }
        this.barChartData1 = [
          {data: this.arrayGas1, label: 'Gas'},
          {data: this.arrayMetan1, label: 'Metan'},
          {data: this.arrayNH31, label: 'NH3'},
          {data: this.arrayCO1, label: 'CO'},
          {data: this.arrayCO21, label: 'CO2'},
          {data: this.arrayAirQuality1, label: 'Air quality'}
        ];
      }
      else{

        this.arrayAirQuality1 = [];
        this.arrayMetan1 = [];
        this.arrayCO1 = [];
        this.arrayCO21 = [];
        this.arrayNH31 = [];
        this.arrayGas1 = [];

        for (var i = 0; i < this.auxData.length; i++) {
          this.labels1.push(this.dateConverter(new Date(this.auxData[i].date)));
          this.arrayAirQuality1.push(this.auxData[i].airquality);
          this.arrayMetan1.push(this.auxData[i].metan);
          this.arrayCO1.push(this.auxData[i].co);
          this.arrayCO21.push(this.auxData[i].co2);
          this.arrayNH31.push(this.auxData[i].nh3);
          this.arrayGas1.push(this.auxData[i].gas);

        }
      this.barChartData1 = [
        {data: this.arrayGas1, label: 'Gas'},
        {data: this.arrayMetan1, label: 'Metan'},
        {data: this.arrayNH31, label: 'NH3'},
        {data: this.arrayCO1, label: 'CO'},
        {data: this.arrayCO21, label: 'CO2'},
        {data: this.arrayAirQuality1, label: 'Air quality'}
      ];
    }
    })
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
