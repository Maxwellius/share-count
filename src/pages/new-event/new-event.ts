import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { SplitAmountPage } from '../split-amount/split-amount';
import { Payment, Project } from '../../models/Project';
import { getConnection } from 'typeorm';

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
  projectId: number;
  displayNewEvent: boolean = false;
  paymentsList: Payment[];
  totalAmount: number;
  newPaymentCallback: (newPayment: Payment) => any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController) {}

  async ngOnInit(){
    if(this.navParams.get('isNewProject')){
      this.project = new Project();
      this.project.name = ''
      await this.project.save();
      this.projectId = this.project.id
      this.displayNewEvent = true;
    } else {
      //This Project initialized to keep async AND don't crash
      this.project = new Project();
      this.project.name = ''

      //This Project with true values
      this.project = await Project.findOne({id:this.navParams.get('projectId')});
      this.projectId = this.navParams.get('projectId');
      this.displayNewEvent = true;
    } 

    this.newPaymentCallback = (newPayment: Payment) => {
      this.project.payments.push(newPayment);
      this.project.save();
    }

    await this.refresh();
  }

  async ionViewDidLoad() {
  }

  onAddPaymentClick(){
    // TODO : Gérer l'ajout d'un paiement
    console.log('TODO : Gérer ajout paiement')
    
  }

  onGoToSplitClick(){
    console.log('TotalAmount: ', this.totalAmount);
    this.navCtrl.push(SplitAmountPage, {
      totalAmount: this.totalAmount,
      projectId: this.project.id
    });
  }

  async onSaveAndReturnClick(){
    if (this.project.name != '' && this.project.name != null){
    getConnection()
      .createQueryBuilder()
      .update(Project)
      .set({
        name : this.project.name
      })
      .where(
        "id = :id", {id: this.projectId}
      ).execute()
      this.navParams.get('callbackRefresh')();
      this.navCtrl.pop();
    } else {
      const toast = await this.toastController.create({message: "Le projet n'a pas de titre, il n'a pas été enregistré", duration: 2000})
      toast.present();
      this.navCtrl.pop();
    }
  }

  async refresh(){
    this.paymentsList = await getConnection()
      .createQueryBuilder()
      .select('payment')
      .from(Payment, 'payment')
      .where('project_id = :id', {id: this.projectId})
      .getMany()
    var sum = 0;
    for (var i = 0; i < this.paymentsList.length; i++){
      sum += this.paymentsList[i].montant
    }
    this.totalAmount = sum
  }
  
  async refreshPaymentList(newPaymentId: number){
    console.log("rafraichissement en cours");
    console.log(newPaymentId);
    const newPayment = await Payment.findOne(newPaymentId);
    console.log(newPayment);
    if(this.project.payments === undefined){
      this.project.payments = [];
      this.project.payments.push(newPayment);
    } else {
      this.project.payments.push(newPayment);
    }
    this.refresh();
  }

}
