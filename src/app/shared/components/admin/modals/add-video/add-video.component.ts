import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  addVideoForm!: FormGroup
  loading = false
  video: any
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;

  constructor(
    public modalService: ModalService,
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.addVideoForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'video': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loading) return
    this.addVideoForm.markAllAsTouched()
    this.loading = true

    const { title } = this.addVideoForm.value
    const { country, conference } = this.modalService.data
    const filePath = `leadership-academy-${title}`
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.video);

    this.uploadPercent = task.percentageChanges()

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.forEach(async (url: any) => {
          if (url) {
            const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
            foundConference.videos.push({ title, url })
            await this.firestoreService.setObj(country)
          }
        })

        this.loading = false
        this.snackbarService.showSnackbar({ text: 'Video successfully uploaded!', success: true })
        this.modalService.closeModal()
      })
    ).subscribe()
  }

  setVideo(event: any) {
    this.video = event.target.files[0]
  }
}
