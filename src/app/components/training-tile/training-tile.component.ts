import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-training-tile',
  templateUrl: './training-tile.component.html',
  styleUrls: ['./training-tile.component.scss']
})
export class TrainingTileComponent implements OnInit {
  @Input() tile!: any;
  @ViewChild('image', {static: true}) image!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
}
