import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';
import Project from '../../models/Project';
import { getRepository, Repository, createConnection } from 'typeorm';
import Payment from '../../models/Payment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  projects: Project[];

  constructor(public navCtrl: NavController, public platform: Platform) {
  }

  async ngOnInit(){
    this.platform.ready().then(async () => {
      //TypeOrm setup
      if(this.platform.is('cordova')) {
        // Running on device or emulator
        console.log("nouvelle connexion")
        const connexion = await createConnection({
          type: 'cordova',
          database: 'shareCount',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          entities: [
            Project,
            Payment
          ]
        });
      } else {
        // Running app in browser
        const connexion = await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          entities: [
            Project,
            Payment
          ]
        });
      }
      console.log('C est le ion view did load');
      this.projects = await Project.find();
    });
  }
  async ionViewDidLoad(){
  }
  onStartButtonClick(){
    this.navCtrl.push(NewEventPage, {
      isNewProject: true,
      projectId: null,
    });
  }
  async test(){
    console.log("ionViewDidLoad")
    const projectRepository = await getRepository('Projects').find();
  }

}
