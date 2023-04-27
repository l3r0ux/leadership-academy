import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() videos!: Array<any>;
  @ViewChild('video') video!: ElementRef;
  program: string = ''
  selectedVideo: any = null
  menuOpen = false

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.program = this.router.url
    this.selectedVideo = this.videos[0]
    const mainContainer = document.querySelector('.main-container')
    mainContainer?.addEventListener('contextmenu', (event: any) => {
      event.preventDefault()
    })
  }

  determineControls(): any {    
    if (this.program.includes('pauline-leadership')) {
      return 'nodownload'
    }
  }
  
  nextVideo(): void {
    const nextVid = this.videos[this.videos.indexOf(this.selectedVideo) + 1]
    if (nextVid) this.selectedVideo = nextVid
  }
  
  prevVideo(): void {
    const prevVid = this.videos[this.videos.indexOf(this.selectedVideo) - 1]
    if (prevVid) this.selectedVideo = prevVid
  }

  setSelectedVideo(video: any): void {
    this.selectedVideo = video
  }

  toggleVideoList(): void {
    this.menuOpen = !this.menuOpen
  }
}
