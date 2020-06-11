import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsHeaderTileComponent } from '../components/components-header-tile/components-header-tile';
import { ComponentsTileComponent } from '../components/components-tile/components-tile';
import { NewEventPage } from '../pages/new-event/new-event';
import { SplitAmountPage } from '../pages/split-amount/split-amount';
import { ComponentsNewPaymentFormTileComponent } from '../components/components-new-payment-form-tile/components-new-payment-form-tile';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { NewMemberPage } from '../pages/new-member/new-member';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'press': {
      time: 1000
    },
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewEventPage,
    ComponentsHeaderTileComponent,
    ComponentsTileComponent,
    ComponentsNewPaymentFormTileComponent,
    SplitAmountPage,
    NewMemberPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    NewEventPage,
    HomePage,
    TabsPage,
    ComponentsHeaderTileComponent,
    ComponentsTileComponent,
    ComponentsNewPaymentFormTileComponent,
    SplitAmountPage ,
    NewMemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
