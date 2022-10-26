import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../models/session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() sessions!: Array<any>

  constructor() { }

  ngOnInit(): void {
  }

}
