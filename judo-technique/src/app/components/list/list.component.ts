import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() videoUrl: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() groupName: string = '';
  @Output() videoUrlSelected = new EventEmitter<string>();

  selectUrl() {
    this.videoUrlSelected.emit(this.videoUrl);
  }
}
