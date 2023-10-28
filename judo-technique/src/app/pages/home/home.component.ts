import { JudoTechnique } from './../../types/types';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent, HttpClientModule],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videoUrl: SafeResourceUrl | undefined;
  judoThrows: JudoTechnique[] = [];

  loading: boolean = false;

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
}
