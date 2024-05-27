import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-checkbox-item',
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CheckboxItemComponent {
  @Input() item!: any;
  @Input() isDisabled: boolean | string = '';
  @Output() changeItem: EventEmitter<any> = new EventEmitter<any>();

  checkChange(item: any) {
    this.changeItem.emit(item);
  }
}
