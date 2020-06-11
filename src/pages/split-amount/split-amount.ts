import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Project, Member } from '../../models/Project';
import { NewMemberPage } from '../new-member/new-member';
import { getConnection } from 'typeorm';

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
  sharesAmount: number = 0;
  member: Member;
  memberList: Member[];
  amountToBePayed: number = 0;
  projectId: Project;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter() {
    this.refresh();
  }

  ngOnInit(){
    this.totalAmount = Math.round((this.navParams.get('totalAmount') + Number.EPSILON) * 100) / 100;
    this.projectId = this.navParams.get('projectId');

    this.refresh();
  }

  async refresh() {
    this.memberList = await getConnection()
      .createQueryBuilder()
      .select('member')
      .from(Member, 'member')
      .where('project_id = :id', {id: this.projectId})
      .getMany();

    this.refreshTotalShareNumber();
    this.calculateAmountToPay();
  }

  onNewMemberButtonClick() {
    this.navCtrl.push(NewMemberPage, {
      isNewProject: true,
      projectId: this.projectId
    })
  }

  shareSoustraction(selectedMember: Member) {
    if(selectedMember.nbShares > 1) {
      selectedMember.nbShares -= 1;
    }
    this.refreshTotalShareNumber();
  }

  shareAddition(selectedMember: Member) {
    selectedMember.nbShares += 1;
    this.refreshTotalShareNumber();
  }

  refreshTotalShareNumber() {
    this.sharesAmount = 0;
    for(let i=0 ; i<this.memberList.length ; i++) {
      this.sharesAmount += this.memberList[i].nbShares;
    }

    this.onShareMemberChanged();
    this.calculateAmountToPay();
  }

  async onShareMemberChanged(){
    for(let i=0 ; i<this.memberList.length ; i++) {
      getConnection()
        .createQueryBuilder()
        .update(Member)
        .set({
          nbShares : this.memberList[i].nbShares
        })
        .where(
          "id = :id", {id: this.memberList[i].id}
        ).execute()
    }
  }

  async calculateAmountToPay() {
    var shareUnit = this.totalAmount / this.sharesAmount;
    var memberAmountToPay = 0;
    for(let i=0 ; i<this.memberList.length ; i++) {
      if(this.memberList[i].nbShares > 1) {
        memberAmountToPay = shareUnit * this.memberList[i].nbShares / 100;
      } else {
        memberAmountToPay = shareUnit / 100;
      }

      memberAmountToPay = Math.round((memberAmountToPay + Number.EPSILON) * 100) / 100;

      getConnection()
        .createQueryBuilder()
        .update(Member)
        .set({
          amountToPay : memberAmountToPay
        })
        .where(
          "id = :id", {id: this.memberList[i].id}
        ).execute()
    }

    this.memberList = await getConnection()
      .createQueryBuilder()
      .select('member')
      .from(Member, 'member')
      .where('project_id = :id', {id: this.projectId})
      .getMany();
  }
}
