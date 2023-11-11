import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Output() groupNameSelected = new EventEmitter<string>();

  selectGroup() {
    this.groupNameSelected.emit(this.name);
  }
}
