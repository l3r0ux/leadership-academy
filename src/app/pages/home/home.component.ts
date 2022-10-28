import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backgroundImageURL = 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666945263/leadership_clarity/space_gexuvs.jpg'
  trainingTiles: Array<any> = [
    {
      program: 'leadership-academy',
      link: '/leadership-academy',
      text: 'FEBC Intl. Leadership Academy',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666945451/leadership_clarity/leadership-academy_b1yf72.jpg'
    },
    {
      program: 'the-forum',
      link: '/the-forum',
      text: 'The Forum',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666945376/leadership_clarity/the-forum_ug7g9p.jpg'
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
