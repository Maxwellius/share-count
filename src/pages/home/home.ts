import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onStartButtonClick(){
    this.navCtrl.push(NewEventPage);
  }

}
