import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEventPage } from './new-event';

@NgModule({
  declarations: [
    NewEventPage,
  ],
  imports: [
    IonicPageModule.forChild(NewEventPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewEventPageModule {}
