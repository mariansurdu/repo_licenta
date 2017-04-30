import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'



@Injectable()
export class EventCompService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('shared service started');
  }

  sendOk() {
    console.log('change started');
    this.fire.emit(true);
  }
  sendOk1(item:any) {
    console.log('change started1');
    this.fire.emit(item);
  }

  getEmittedValue() {
    return this.fire;
  }

}
