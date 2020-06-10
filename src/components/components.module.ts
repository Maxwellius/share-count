import { NgModule } from '@angular/core';
import { ComponentsTileComponent } from './components-tile/components-tile';
import { ComponentsHeaderTileComponent } from './components-header-tile/components-header-tile';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsNewPaymentFormTileComponent } from './components-new-payment-form-tile/components-new-payment-form-tile';
@NgModule({
	declarations: [ComponentsTileComponent,
    ComponentsHeaderTileComponent],
	imports: [BrowserModule],
	exports: [ComponentsTileComponent,
	ComponentsHeaderTileComponent,
	ComponentsNewPaymentFormTileComponent]
})
export class ComponentsModule {}
