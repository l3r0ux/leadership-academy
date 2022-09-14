import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-tile',
  templateUrl: './training-tile.component.html',
  styleUrls: ['./training-tile.component.scss']
})
export class TrainingTileComponent implements OnInit {
  @Input() tile!: any;
  @ViewChild('image', {static: true}) image!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.tile)
  }

  navigate(): void {
    if (this.tile.text.toLowerCase().includes('academy')) {
      this.router.navigate(['/leadership-academy'])
    } else if (this.tile.text.toLowerCase().includes('forum')) {
      this.router.navigate(['/the-forum'])
    } else if (this.tile.text.toLowerCase().includes('pauline')) {
      this.router.navigate(['/pauline-leadership'])
    }
  }
}
