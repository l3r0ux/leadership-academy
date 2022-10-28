import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  tabs: Array<any> = [
    {
      title: 'The Forum',
      selector: 'the-forum',
      routerLink: 'the-forum'
    },
    {
      title: 'FEBC Intl. Leadership Academy',
      selector: 'leadership-academy',
      routerLink: 'leadership-academy'
    },
    {
      title: 'Pauline Leadership Training',
      selector: 'pauline-leadership',
      routerLink: 'pauline-leadership'
    }
  ]
  searchForm!: FormGroup
  applications: Array<any> = [];
  loadingApplications = false
  isLoadingMore = false
  searchLoading = false
  limit = 5
  isAllApplications = false

  constructor(
    private firestoreService: FirestoreService,
    private modalService: ModalService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit(): Promise<void> {
    this.searchForm = new FormGroup({
      'search': new FormControl(null, [Validators.required, Validators.email])
    })

    this.loadingApplications = true
    this.applications = await this.firestoreService.getApplications()
    this.loadingApplications = false

    await this.checkCanLoadMore()

    this.modalService.applicationDeletedSubject.subscribe(async () => {
      this.applications = await this.firestoreService.getApplications(this.limit)
      await this.checkCanLoadMore()
    })
  }

  async onSearch(): Promise<void> {
    this.searchForm.markAllAsTouched()
    if (!this.searchForm.valid) return

    const searchTerm = this.searchForm.value.search

    this.searchLoading = true
    try {
      this.applications = await this.firestoreService.searchApplications(searchTerm)
    } catch (error) {
      this.snackbarService.showSnackbar({ text: 'Oops! Something went wrong', success: false })
    }
    this.searchLoading = false
    this.limit = 5
  }

  async loadMore(): Promise<void> {
    this.isLoadingMore = true
    this.limit += 5

    try {
      await this.loadNextApplications()
    } catch (error: any) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong', success: false })
    }
    this.isLoadingMore = false
  }

  async loadNextApplications(): Promise<void> {
    const nextApplications = await this.firestoreService.loadMoreApplications(this.applications[this.applications.length - 1].createdAt)
    const lastDoc: any = await this.firestoreService.getLastApplication()

    this.applications = this.applications.concat(nextApplications)

    if (nextApplications[nextApplications.length - 1].id === lastDoc.id) {
      this.isAllApplications = true
    }
  }

  async checkCanLoadMore(): Promise<void> {
    const lastDoc: any = await this.firestoreService.getLastApplication()

    if (this.applications[this.applications.length - 1]?.id === lastDoc?.id) {
      this.isAllApplications = true
    } else {
      this.isAllApplications = false
    }
  }
}
