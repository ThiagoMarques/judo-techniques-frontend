import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videoUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // const url = 'https://player.vimeo.com/video/698792378?h=acb9b5c20a'; 
    // this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onVideoUrlSelected(url: string) {
    this.videoUrl = url;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
