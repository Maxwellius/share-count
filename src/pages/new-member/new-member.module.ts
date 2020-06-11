import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMemberPage } from './new-member';

@NgModule({
  declarations: [
    NewMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(NewMemberPage),
  ],
})
export class NewMemberPageModule {}
