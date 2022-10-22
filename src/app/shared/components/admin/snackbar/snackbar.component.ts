import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  @ViewChild('snackbar') snackbar!: ElementRef
  text: string = ''
  success: boolean = false

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.snackbarService.snackbarSubject.subscribe((res) => {
      this.text = res.text
      this.success = res.success
      this.snackbar.nativeElement.classList.add('visible')
      setTimeout(() => {
        this.snackbar.nativeElement.classList.remove('visible')

        setTimeout(() => {
          this.text = ''
          this.success = false
        }, 300)
      }, 2000)
    })
  }

}
