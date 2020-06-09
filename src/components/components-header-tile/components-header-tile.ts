import { Component, Input, OnInit } from '@angular/core';

/**
 * @export
 * @class ComponentsHeaderTileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'components-header-tile',
  templateUrl: 'components-header-tile.html'
})
export class ComponentsHeaderTileComponent implements OnInit{

  @Input() justTitle: boolean;
  @Input() title: string;
  @Input() subtitle?: string;

  constructor() {
  }

  ngOnInit(){
  }

}
