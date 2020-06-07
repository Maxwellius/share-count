import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplitAmountPage } from '../split-amount/split-amount';

/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }

  onAddPaymentClick(){
    // TODO : Gérer l'ajout d'un paiement
    console.log('TODO : Gérer ajout paiement')
  }

  onGoToSplitClick(){
    this.navCtrl.push(SplitAmountPage);
  }

  onSaveAndReturnClick(){
    // TODO : Save Current Data
    this.navCtrl.pop();
  }

}
