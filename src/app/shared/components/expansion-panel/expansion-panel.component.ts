import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Application } from '../../models/application';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit, AfterViewInit {
  @Input() data!: Array<any>
  @Input() application!: Application
  @Input() header!: string
  @Input() isAdmin: boolean = false
  @Input() country: any
  @Input() conference: any
  @Input() session: any
  @ViewChild('panelBody') panelBody!: ElementRef
  @ViewChild('chevron') chevron!: ElementRef

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toggleExpansion()
  }

  openEditDialog(data: any): void {
    this.modalService.openModal(this.header === 'Videos' ? 'Edit video' : 'Edit teaching material', {
      country: this.country,
      conference: this.conference,
      session: this.session,
      resource: this.header.toLocaleLowerCase(),
      data
    })
  }

  openDeleteConfirmation(data: any): void {
    this.modalService.openModal('Confirm delete', {
      country: this.country,
      conference: this.conference,
      session: this.session,
      resource: this.header.toLocaleLowerCase(),
      data
    })
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

  openAddResource(event: any): void {
    event.stopPropagation()

    switch(this.header.toLocaleLowerCase()) {
      case 'videos':
        this.modalService.openModal('Add video', { country: this.country, conference: this.conference, session: this.session })
        break;
      case 'teaching material':
        this.modalService.openModal('Add teaching material', { country: this.country, conference: this.conference, session: this.session })
        break;
    }
  }

  openAcceptModal(event: any, application: Application): void {
    event.stopPropagation()
    this.modalService.openModal('Accept application', application)
  }

  openRejectModal(event: any, application: Application): void {
    event.stopPropagation()
    this.modalService.openModal('Reject application', application)
  }
}
