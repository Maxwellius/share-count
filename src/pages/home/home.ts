import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NewEventPage } from '../new-event/new-event';
import { getRepository, Repository, createConnection } from 'typeorm';
import { Payment, Project, Member } from '../../models/Project';

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
            Payment,
            Member
          ]
        });
        await connexion.synchronize();
      } else {
        // Running app in browser
        const connexion = await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          entities: [
            Project,
            Payment,
            Member
          ]
        });
        await connexion.synchronize();
      }
      await this.refreshPage();
    });
  }

  trackByProjects(index: number, item: Project ) {
    return item.id;
  }

  async refreshPage() {
    console.log('RefreshPage called')
    this.projects = await Project.find();
    this.projects = [...this.projects];
  }

  onStartButtonClick() {
    this.navCtrl.push(NewEventPage, {
      isNewProject: true,
      projectId: null,
      callbackRefresh: () => this.refreshPage()
    })
  }

  onDetailButtonClick(projectId: number) {
    this.navCtrl.push(NewEventPage, {
      isNewProject: false,
      projectId: projectId,
      callbackRefresh: () => this.refreshPage()
    })
  }
}
