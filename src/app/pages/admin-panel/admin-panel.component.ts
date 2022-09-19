import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Conference, Session } from 'src/app/shared/models/conference';
import { conferences, sessions } from 'src/app/shared/dummyData';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('programUnderline') programUnderline!: ElementRef
  @ViewChild('typeUnderline') typeUnderline!: ElementRef
  programTabSelected: string = 'forum'
  typeTabSelected: string = 'conferences'
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setTabUnderline(this.programTabSelected, true)
    this.setTabUnderline(this.typeTabSelected, false)
  }

  selectTab(option: string, isProgram = false): void {
    console.log(isProgram)
    isProgram ? this.programTabSelected = option : this.typeTabSelected = option
    this.typeTabSelected = option

    this.setTabUnderline(option, isProgram);
  }

  setTabUnderline(option: string, isProgram: boolean): void {
    if (isProgram) {
      const activeTab = document.querySelector(`.${option}`) as HTMLElement
      const activeTabDimensionsMiddle = activeTab!.offsetLeft + (activeTab!.offsetWidth / 2)
      const activeTabWidth = activeTab.offsetWidth
      this.programUnderline.nativeElement.style.left = `${activeTabDimensionsMiddle}px`
      this.programUnderline.nativeElement.style.width = `${activeTabWidth + 10}px`
    } else {
      const activeTab = document.querySelector(`.${option}`) as HTMLElement
      const activeTabDimensionsMiddle = activeTab!.offsetLeft + (activeTab!.offsetWidth / 2)
      const activeTabWidth = activeTab.offsetWidth
      this.typeUnderline.nativeElement.style.left = `${activeTabDimensionsMiddle}px`
      this.typeUnderline.nativeElement.style.width = `${activeTabWidth + 10}px`
    }
  }
}
