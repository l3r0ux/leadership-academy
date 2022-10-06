import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trainingTiles: Array<any> = [
    {
      program: 'leadership-academy',
      link: '/leadership-academy',
      text: 'FEBC Intl. Leadership Academy',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662390922/leadership_clarity/the_forum_ahcljj.jpg'
    },
    {
      program: 'the-forum',
      link: '/the-forum',
      text: 'The Forum',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662390920/leadership_clarity/leadership_academy_qweeju.jpg'
    },
    {
      program: 'pauline-leadership',
      link: '/pauline-leadership',
      text: 'Pauline Leadership Training',
      imageURL: 'assets/pauline-puzzle.jpg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
