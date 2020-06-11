import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project, Payment } from '../../models/Project'
import { getConnection } from 'typeorm';

/**
 * Generated class for the ComponentsNewPaymentFormTileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-new-payment-form-tile',
  templateUrl: 'components-new-payment-form-tile.html'
})
export class ComponentsNewPaymentFormTileComponent implements OnInit{

  payment: Payment;
  paymentName: string;
  @Input()
  projectId: number;
  @Output() onNewPayment: EventEmitter<any> = new EventEmitter();

  project: Project;

  constructor() {
    console.log('project.id dans constructeur', this.projectId);
  }

  ngOnInit(){
    this.payment = new Payment()
    getConnection()
      .createQueryBuilder() 
      .select('project')
      .from(Project, 'project')
      .where('project_id = :id', {id: this.projectId})
      .getOne().then((project) => {
        this.payment.project = project
        console.log(this.payment)
      });
  }


  async newPaymentButtonClicked(){
    console.log(this.payment)
    this.payment.montant = this.payment.montant * 100 // To cents
    getConnection()
      .createQueryBuilder()
      .insert()
      .into('Payment')
      .values(
        {name: this.payment.name, montant: this.payment.montant}
      ).execute().then((value) => {
        console.log('insert reussi')
        getConnection()
          .createQueryBuilder()
          .relation(Project, "payments")
          .of(this.projectId)
          .add(value.identifiers[0].id).then(
            () => {
              console.log('relationajoutée');
              this.payment.name = '';
              this.payment.montant = 0;
              this.onNewPayment.emit(value.identifiers[0].id);
            }
          )
      });
  }
}
