import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Conference, Session } from 'src/app/shared/models/conference';
import { conferences, sessions } from 'src/app/shared/dummyData';

@Component({
  selector: 'app-the-forum',
  templateUrl: './the-forum.component.html',
  styleUrls: ['./the-forum.component.scss']
})
export class TheForumAdminComponent implements OnInit {
  @ViewChild('underline') underline!: ElementRef
  @ViewChild('conferencesTab') conferencesTab!: ElementRef
  tabSelected: string = 'conferences'
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setTabUnderline(this.tabSelected)
  }

  selectTab(type: string): void {
    this.tabSelected = type

    this.setTabUnderline(type);
  }

  setTabUnderline(type: string): void {
    const activeTab = document.querySelector(`.${type}`) as HTMLElement
    const activeTabDimensionsMiddle = activeTab!.offsetLeft + (activeTab!.offsetWidth / 2)
    const activeTabWidth = activeTab.offsetWidth
    this.underline.nativeElement.style.left = `${activeTabDimensionsMiddle}px`
    this.underline.nativeElement.style.width = `${activeTabWidth + 10}px`
  }
}
