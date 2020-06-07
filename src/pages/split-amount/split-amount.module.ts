import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitAmountPage } from './split-amount';

@NgModule({
  declarations: [
    SplitAmountPage,
  ],
  imports: [
    IonicPageModule.forChild(SplitAmountPage),
  ],
})
export class SplitAmountPageModule {}
