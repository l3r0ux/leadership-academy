import { Component, OnInit } from '@angular/core';
import { conferences, sessions } from 'src/app/shared/dummyData';
import { Conference } from 'src/app/shared/models/conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesAdminComponent implements OnInit {
  conferences!: Array<Conference>

  constructor() { }

  ngOnInit(): void {
  }

}
