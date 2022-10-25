import { Component, OnInit, Input } from '@angular/core';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {
  @Input() countries!: Array<Conference>

  constructor() { }

  ngOnInit(): void {
  }

}
