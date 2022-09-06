import { Component, OnInit } from '@angular/core';
import { Conference } from 'src/app/shared/models/conference';
import { conferences } from 'src/app/shared/dummyData';

@Component({
  selector: 'app-leadership-academy',
  templateUrl: './leadership-academy.component.html',
  styleUrls: ['./leadership-academy.component.scss']
})
export class LeadershipAcademyComponent implements OnInit {
  conferences: Array<Conference> = conferences;

  constructor() { }

  ngOnInit(): void {
  }

}
