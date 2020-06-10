import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SplitAmountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-split-amount',
  templateUrl: 'split-amount.html',
})
export class SplitAmountPage implements OnInit{

  totalAmount: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplitAmountPage');
  }

  ngOnInit(){
    this.totalAmount = this.navParams.get('totalAmount');
  }
}
