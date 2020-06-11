import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { getConnection } from 'typeorm';
import { Project, Member } from '../../models/Project';

/**
 * Generated class for the NewMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-member',
  templateUrl: 'new-member.html',
})
export class NewMemberPage {

  member: Member;
  memberName: string;
  project: Project;
  projectId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController) {}

  async ngOnInit() {
    this.member = new Member();
    this.member.name = '';

    this.projectId = this.navParams.get('projectId');

    getConnection()
      .createQueryBuilder() 
      .select('project')
      .from(Project, 'project')
      .where('project_id = :id', {id: this.projectId})
      .getOne().then((project) => {
        this.member.project = project;
      });
  }

  async onAddMember() {
    if(this.memberName != '' && this.memberName != null) {
      getConnection()
        .createQueryBuilder()
        .insert()
        .into('Member')
        .values(
          {name: this.memberName, nbShares: 1}
        ).execute().then((value) => {
          console.log(value.identifiers[0].id)
          console.log(this.projectId)
          getConnection()
            .createQueryBuilder()
            .relation(Project, "members")
            .of(this.projectId)
            .add(value.identifiers[0].id).then(
              () => {
                this.member.name = '';
                this.member.nbShares = 1;
              }
            )
        });
      this.navCtrl.pop();
    } else {
      const toast = await this.toastController.create({message: "Veuillez spécifier le nom du nouveau membre", duration: 2000})
      toast.present();
    }
  }

  onCancelAddMember() {
    this.navCtrl.pop();
  }
}
