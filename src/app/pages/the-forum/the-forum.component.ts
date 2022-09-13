import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { conferences, sessions } from 'src/app/shared/dummyData';
import { Conference } from 'src/app/shared/models/conference';
import { Session } from 'src/app/shared/models/session';

@Component({
  selector: 'app-the-forum',
  templateUrl: './the-forum.component.html',
  styleUrls: ['./the-forum.component.scss'],
})
export class TheForumComponent implements OnInit, AfterViewInit {
  @ViewChild('underline') underline!: ElementRef
  tabSelected: string = 'conferences'
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions

  constructor() { }

  ngOnInit(): void {
    // TODO: fetch and set data here from API based on tab selected
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
