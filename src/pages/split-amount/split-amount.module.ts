import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitAmountPage } from './split-amount';

@NgModule({
  declarations: [
    SplitAmountPage,
  ],
  imports: [
    IonicPageModule.forChild(SplitAmountPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SplitAmountPageModule {}
