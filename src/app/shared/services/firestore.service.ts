import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getUserDoc(userId: string): Observable<any> {
    return this.afs.collection('users').doc(userId).valueChanges({ idField: 'userId' })
  }

  async apply(application: any): Promise<any> {
    return await this.afs.collection('applications').add(application)
  }

  getApplications(): Observable<any> {
    return this.afs.collection('applications').valueChanges({ idField: 'applicationId' })
  }

  async createUserDoc(email: string, userId: string): Promise<any> {
    return await this.afs.collection('users').doc(userId).set({
      email,
      isAdmin: false,
      programsEnrolled: []
    })
  }

  async acceptApplication(application: any) {
    return await this.afs.collection('users').doc(application.userId).update({ programsEnrolled: arrayUnion(application.program) })
  }

  async removeApplication(application: any) {
    return await this.afs.collection('applications').doc(application.applicationId).delete()
  }
}
