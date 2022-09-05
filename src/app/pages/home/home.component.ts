import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trainingTiles: Array<any> = [
    {
      text: 'Leadership Academy',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662390922/leadership_clarity/the_forum_ahcljj.jpg'
    },
    {
      text: 'The Forum',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662390920/leadership_clarity/leadership_academy_qweeju.jpg'
    },
    {
      text: 'Pauline Leadership Training',
      imageURL: 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662390920/leadership_clarity/examining_christian_leadership_cn0rru.jpg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
