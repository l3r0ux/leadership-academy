import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-teaching-material',
  templateUrl: './add-teaching-material.component.html',
  styleUrls: ['./add-teaching-material.component.scss']
})
export class AddTeachingMaterialComponent implements OnInit {
  addTeachingMaterialForm!: FormGroup
  loading = false
  teachingMaterial: any
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;

  constructor(
    public modalService: ModalService,
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.addTeachingMaterialForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'teachingMaterial': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loading) return
    this.addTeachingMaterialForm.markAllAsTouched()
    if (!this.addTeachingMaterialForm.valid) return
    this.loading = true

    const { title } = this.addTeachingMaterialForm.value
    const { country, conference } = this.modalService.data
    const filePath = `material-leadership-${title}-${conference.date}`
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.teachingMaterial);

    this.uploadPercent = task.percentageChanges()

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.forEach(async (url: any) => {
          if (url) {
            const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
            foundConference.teachingMaterials.push({ title, url })
            await this.firestoreService.updateData(country, 'leadership-academy-countries')
          }
        })

        this.loading = false
        this.snackbarService.showSnackbar({ text: 'Teaching material successfully uploaded!', success: true })
        this.modalService.closeModal()
      })
    ).subscribe()
  }

  setTeachingMaterial(event: any) {
    this.teachingMaterial = event.target.files[0]
  }
}
