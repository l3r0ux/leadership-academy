import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-carousel',
  templateUrl: './video-carousel.component.html',
  styleUrls: ['./video-carousel.component.scss']
})
export class VideoCarouselComponent implements OnInit {
  @Input() videos!: Array<any>;
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('video') video!: ElementRef;

  constructor() { }

  ngOnInit(): void {
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
