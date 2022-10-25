import { Component, ElementRef, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs!: Array<any>
  @Output() tabChanged = new EventEmitter
  @ViewChild('underline') underline!: ElementRef
  tabSelected!: any

  constructor() { }

  ngOnInit(): void {
    this.tabSelected = this.tabs[0]
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTabUnderline(this.tabSelected)
    })
  }

  selectTab(tab: string): void {
    this.tabSelected = tab
    this.setTabUnderline(tab);
    this.tabChanged.emit(tab)
  }

  setTabUnderline(tab: any): void {
    const activeTab = document.querySelector(`.${tab.selector}`) as HTMLElement
    const activeTabDimensionsMiddle = activeTab!.offsetLeft + (activeTab!.offsetWidth / 2)
    const activeTabWidth = activeTab.offsetWidth
    this.underline.nativeElement.style.left = `${activeTabDimensionsMiddle}px`
    this.underline.nativeElement.style.width = `${activeTabWidth + 10}px`
  }
}
