import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  applyForm!: FormGroup

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
    this.applyForm = new FormGroup({
      'trainingType': new FormControl('forum'),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'country': new FormControl(null, [Validators.required]),
      'private-or-org': new FormControl('private'),
    })
  }

  onSubmit(): void {
    console.log('Submitted')
    console.log(this.applyForm)
    this.applyForm.markAllAsTouched();
    if (!this.applyForm.valid) return
  }
}
