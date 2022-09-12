import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() data!: Array<{ title: string, URL: string }>
  @Input() header!: string
  @ViewChild('panelBody') panelBody!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpansion(): void {
    this.panelBody.nativeElement.classList.toggle('visible')

    if (this.panelBody.nativeElement.classList.contains('visible')) {
      this.panelBody.nativeElement.style.height = `${this.panelBody.nativeElement.scrollHeight}px`
    } else {
      this.panelBody.nativeElement.style.height = ''
    }
  }
}
