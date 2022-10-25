import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backgroundImageURL = 'assets/space.jpg'
  trainingTiles: Array<any> = [
    {
      program: 'leadership-academy',
      link: '/leadership-academy',
      text: 'FEBC Intl. Leadership Academy',
      imageURL: 'assets/leadership-academy.jpg'
    },
    {
      program: 'the-forum',
      link: '/the-forum',
      text: 'The Forum',
      imageURL: 'assets/the-forum.jpg'
    },
    {
      program: 'pauline-leadership',
      link: '/pauline-leadership',
      text: 'Pauline Leadership Training',
      imageURL: 'assets/pauline-puzzle-tile.jpg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
