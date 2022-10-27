import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {
  @Input() countries!: Array<any>

  constructor() { }

  ngOnInit(): void {
  }

  showCountryHeading(country: any): boolean {
    return country.conferences.length && country.conferences.some((el: any) => el.isLive)
  }
}
