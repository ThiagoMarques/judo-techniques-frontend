import { JudoTechnique } from './../../types/types';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from 'src/app/components/form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent, HttpClientModule, FormComponent],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videoUrl: SafeResourceUrl | undefined;
  judoThrows: JudoTechnique[] = [];
  renderThrows: JudoTechnique[] = [];
  groups: any[] = []; //Refatorar
  groupNameSelected: string = '';
  loading: boolean = false;
  displayThrows: boolean = true;
  editThrow: boolean = false;
  dataEditThrow: JudoTechnique[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getThrows();
  }

  getThrows() {
    this.loading = true;
    this.apiService.getThrows().subscribe({
      next: (data: JudoTechnique[]) => {
        this.judoThrows = data;
        this.getGroupNames(this.judoThrows);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onVideoUrlSelected(url: string) {
    this.videoUrl = url;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onShowHome(option: any) {
    console.log("🚀 ~ file: home.component.ts:58 ~ HomeComponent ~ onShowHome ~ option:", option)
    if(option) {
      this.displayThrows = true;
    }
  }

  createThrow() {
    this.displayThrows = false;
  }

  editThrowSelected(id: number) {
    this.loading = true;
    this.displayThrows = false;
    this.editThrow = true;
    this.dataEditThrow = this.judoThrows.filter((tech: JudoTechnique) => tech.id === id);
    this.loading = false;
    console.log('id', id)
  }

  getGroupNames(data: JudoTechnique[]) {
    this.groups = data.map((item: JudoTechnique) => item.groupName);
    console.log("🚀 ~ file: home.component.ts:57 ~ HomeComponent ~ getGroupNames ~ this.groups:", this.groups)
  }

  onGroupNameSelected(groupName: string) {
    this.groupNameSelected = groupName;
    this.renderThrows = this.judoThrows.filter((item: JudoTechnique) => item.groupName === groupName);
    console.log("🚀 ~ file: home.component.ts:63 ~ HomeComponent ~ onGroupNameSelected ~ this.renderThrows:", this.renderThrows)
  }
}
