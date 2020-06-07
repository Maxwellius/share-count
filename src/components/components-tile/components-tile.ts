import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsTileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-tile',
  templateUrl: 'components-tile.html'
})
export class ComponentsTileComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsTileComponent Component');
    this.text = 'Hello World';
  }

}
