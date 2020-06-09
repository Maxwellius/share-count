import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { SplitAmountPage } from '../split-amount/split-amount';
import Project from '../../models/Project';

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

  project: Project;
  projectNameControlValue: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController
    ) {
  }

  async ionViewDidLoad() {
    if(this.navParams.get('isNewProject')){
      this.project = new Project();
    } else {
      this.project = await Project.findOne({id:this.navParams.get('projectId')})
      this.projectNameControlValue = this.project.name
    } 
  }

  onAddPaymentClick(){
    // TODO : Gérer l'ajout d'un paiement
    console.log('TODO : Gérer ajout paiement')
    
  }

  onGoToSplitClick(){
    this.navCtrl.push(SplitAmountPage);
  }

  async onSaveAndReturnClick(){
    if (this.projectNameControlValue != '' && this.projectNameControlValue != null){
      this.project.name = this.projectNameControlValue; 
      await this.project.save();
      this.navCtrl.pop();
    } else {
      console.log('hello');
      const toast = await this.toastController.create({message: "Le projet n'a pas de titre, il n'a pas été enregistré", duration: 2000})
      toast.present();
      this.navCtrl.pop();
    }
  }

}
