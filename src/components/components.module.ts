import { NgModule } from '@angular/core';
import { ComponentsTileComponent } from './components-tile/components-tile';
import { ComponentsHeaderTileComponent } from './components-header-tile/components-header-tile';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
	declarations: [ComponentsTileComponent,
    ComponentsHeaderTileComponent],
	imports: [BrowserModule],
	exports: [ComponentsTileComponent,
    ComponentsHeaderTileComponent]
})
export class ComponentsModule {}
