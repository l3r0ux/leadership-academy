import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  snackbarSubject: Subject<any> = new Subject()

  constructor() { }

  showSnackbar({ text, success }: any = {}): void {
    this.snackbarSubject.next({ text, success })
  }
}
