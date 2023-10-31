import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import { ApiService } from 'src/app/services/api.service';
import { JudoTechnique } from 'src/app/types/types';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListComponent],
  providers: [ApiService],
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
  loading: boolean = false;
  mode: string = 'create' || 'edit';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.mode = this.edit ? 'edit' : 'create';
    this.forms();
  }

  forms() {
    this.form = new FormGroup({
      'id': new FormControl(this.mode === 'edit' ? this.id : null),
      'groupName': new FormControl(this.mode === 'edit' ? this.groupName : null),
      'name': new FormControl(this.mode === 'edit' ? this.name : null),
      'videoUrl': new FormControl(this.mode === 'edit' ? this.videoUrl : null),
      'imageUrl': new FormControl(this.mode === 'edit' ? this.imageUrl : null),
      'description': new FormControl(this.mode === 'edit' ? this.description : null, [Validators.maxLength(150)]) // para o campo Descrição
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

  createThrow() {
    this.loading = true;
    this.apiService.postThrow(this.form.value).subscribe({
      next: () => {
        this.backToHome();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  editThrow() {
    this.loading = true;
    this.apiService.putThrow(this.form.value).subscribe({
      next: () => {
        this.backToHome();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  removeThrow() {
    this.loading = true;
    this.apiService.delete(this.form.get('id')?.value).subscribe({
      next: () => {
        this.backToHome();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
  backToHome() {
    console.log('Clicou')
    this.returnSelected.emit(true);
  }

}
