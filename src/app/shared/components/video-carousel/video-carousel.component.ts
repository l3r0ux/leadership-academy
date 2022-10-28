import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-carousel',
  templateUrl: './video-carousel.component.html',
  styleUrls: ['./video-carousel.component.scss']
})
export class VideoCarouselComponent implements OnInit {
  @Input() videos!: Array<any>;
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('video') video!: ElementRef;
  program: string = ''

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.program = this.router.url
    const carouselContainer = document.querySelector('.carousel-container')
    carouselContainer?.addEventListener('contextmenu', (event: any) => {
      event.preventDefault()
    })
  }

  determineControls(): any {    
    if (this.program.includes('pauline-leadership')) {
      return 'nodownload'
    }
  }
  
  nextVideo(): void {
    this.carousel.nativeElement.scrollBy({
      left: this.video.nativeElement.getBoundingClientRect().width,
      behavior: 'smooth'
    })
  }
  
  prevVideo(): void {
    this.carousel.nativeElement.scrollBy({
      left: -this.video.nativeElement.getBoundingClientRect().width,
      behavior: 'smooth'
    })
  }
}
