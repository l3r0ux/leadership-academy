import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Application } from '../../models/application';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit, AfterViewInit {
  @Input() teachingMaterial!: Array<{ title: string, URL: string }>
  @Input() application!: Application
  @Input() header!: string
  @ViewChild('panelBody') panelBody!: ElementRef
  @ViewChild('chevron') chevron!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toggleExpansion()
  }

  toggleExpansion(): void {
    this.panelBody.nativeElement.classList.toggle('visible')
    this.chevron.nativeElement.classList.toggle('expanded')

    if (this.panelBody.nativeElement.classList.contains('visible')) {
      this.panelBody.nativeElement.style.height = `${this.panelBody.nativeElement.scrollHeight}px`
    } else {
      this.panelBody.nativeElement.style.height = 0
    }
  }
}
