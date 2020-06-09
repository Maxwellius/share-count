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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController
    ) {
  }
  async ngOnInit(){
    if(this.navParams.get('isNewProject')){
      this.project = new Project();
      this.project.name = ''
    } else {
      //This Project initialized to keep async AND don't crash
      this.project = new Project();
      this.project.name = ''

      //This Project with true values
      console.log(this.navParams.get('projectId'));
      this.project = await Project.findOne({id:this.navParams.get('projectId')});
    } 
  }

  async ionViewDidLoad() {
  }

  onAddPaymentClick(){
    // TODO : Gérer l'ajout d'un paiement
    console.log('TODO : Gérer ajout paiement')
    
  }

  onGoToSplitClick(){
    this.navCtrl.push(SplitAmountPage);
  }

  async onSaveAndReturnClick(){
    if (this.project.name != '' && this.project.name != null){
      await this.project.save();
      this.navParams.get('callbackRefresh')();
      this.navCtrl.pop();
    } else {
      const toast = await this.toastController.create({message: "Le projet n'a pas de titre, il n'a pas été enregistré", duration: 2000})
      toast.present();
      this.navCtrl.pop();
    }
  }

}
