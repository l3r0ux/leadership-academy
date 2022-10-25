import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backgroundImageURL = 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666705063/leadership_clarity/space_ydvfqk.jpg'
  trainingTiles: Array<any> = [
    {
      program: 'leadership-academy',
      link: '/leadership-academy',
      text: 'FEBC Intl. Leadership Academy',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666705060/leadership_clarity/leadership-academy_zpvvi6.jpg'
    },
    {
      program: 'the-forum',
      link: '/the-forum',
      text: 'The Forum',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666705062/leadership_clarity/the-forum_xmc8bd.jpg'
    },
    {
      program: 'pauline-leadership',
      link: '/pauline-leadership',
      text: 'Pauline Leadership Training',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666705061/leadership_clarity/pauline-puzzle-tile_g4bwkp.jpg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
