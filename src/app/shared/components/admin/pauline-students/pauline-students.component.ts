import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-pauline-students',
  templateUrl: './pauline-students.component.html',
  styleUrls: ['./pauline-students.component.scss']
})
export class PaulineStudentsComponent implements OnInit {
  @Input() students!: Array<any>
  @Output() moreLoaded = new EventEmitter<Array<any>>();
  @Output() studentsLoaded = new EventEmitter<Array<any>>();
  limit = 5
  isLoadingMore = false
  isAllStudents = false

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.checkCanLoadMore()

    this.modalService.studentUnenrolledSubject.subscribe(async () => {
      const students = await this.firestoreService.getPaulineStudents(this.limit)
      this.studentsLoaded.emit(students)
      await this.checkCanLoadMore()
    })

    this.modalService.applicationDeletedSubject.subscribe(async () => {
      const students = await this.firestoreService.getPaulineStudents(this.limit)
      this.studentsLoaded.emit(students)
      await this.checkCanLoadMore()
    })
  }

  async unenroll(student: any): Promise<any> {
    try {
      await this.firestoreService.unenrollPaulineStudent(student)
      this.modalService.studentUnenrolledSubject.next(student)
      this.snackbarService.showSnackbar({ text: 'Student unenrolled successfully', success: true })
    } catch (error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Oops! Something went wrong', success: false })
    }
  }

  async loadMore(): Promise<void> {
    this.isLoadingMore = true
    this.limit += 5

    try {
      await this.loadNextStudents()
    } catch (error: any) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong', success: false })
    }
    this.isLoadingMore = false
  }

  async loadNextStudents(): Promise<void> {
    const nextStudents = await this.firestoreService.loadMoreStudents(this.students[this.students.length - 1].email)
    const lastDoc: any = await this.firestoreService.getLastStudent()

    this.moreLoaded.emit(nextStudents)
    if (nextStudents[nextStudents.length - 1].id === lastDoc.id) {
      this.isAllStudents = true
    }
  }

  async checkCanLoadMore(): Promise<void> {
    const lastDoc: any = await this.firestoreService.getLastStudent()

    if (this.students[this.students.length - 1]?.email === lastDoc?.email) {
      this.isAllStudents = true
    } else {
      this.isAllStudents = false
    }
  }

  async fetchNewPaulineStudents(): Promise<void> {
    const students = await this.firestoreService.getPaulineStudents(this.limit)
    this.studentsLoaded.emit(students)
    await this.checkCanLoadMore()
  }
}
