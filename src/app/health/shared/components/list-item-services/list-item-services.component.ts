import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item-services.component.html',
  styleUrls: ['./list-item-services.component.scss']
})
export class ListItemServicesComponent {

  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [
      `../services`,
      item.key
    ];
  }

}
