import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() edit: boolean = false;
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() videoUrl: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() groupName: string = '';
  @Output() videoUrlSelected = new EventEmitter<string>();
  @Output() returnSelected = new EventEmitter<boolean>();

  form!: FormGroup;

  mode: string = 'create' || 'edit';

  ngOnInit(): void {
    this.mode = this.edit ? 'edit' : 'create';
    this.forms();
  }

  forms() {
    this.form = new FormGroup({
      'groupName': new FormControl(null),
      'name': new FormControl(null),
      'videoUrl': new FormControl(null),
      'imageUrl': new FormControl(null),
      'description': new FormControl(null, [Validators.maxLength(50)]) // para o campo Descrição
    });
  }

  getFormErrors(): string[] {
    let errors: string[] = [];

    const descricaoControl = this.form.get('description');

    if (descricaoControl?.hasError('maxlength')) {
      errors.push('Descrição deve ter no máximo 50 caracteres.');
    }

    return errors;
  }

  selectUrl() {
    this.videoUrlSelected.emit(this.form.get('videoUrl')?.value);
  }
  backToHome() {
    console.log('Clicou')
    this.returnSelected.emit(true);
  }

}
