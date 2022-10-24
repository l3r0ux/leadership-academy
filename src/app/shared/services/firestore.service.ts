import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { arrayUnion, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  // Users
  getUserDoc(userId: string): Observable<any> {
    return this.afs
      .collection('users')
      .doc(userId)
      .valueChanges({ idField: 'userId' })
  }

  async createUserDoc(email: string, userId: string): Promise<any> {
    return await this.afs
      .collection('users')
      .doc(userId)
      .set({
        email,
        isAdmin: false,
        programsEnrolled: []
    })
  }

  // Applications
  async acceptApplication(application: any) {
    return await this.afs
      .collection('users')
      .doc(application.userId)
      .update({ programsEnrolled: arrayUnion(application.program) })
  }

  async removeApplication(application: any) {
    return await this.afs
      .collection('applications')
      .doc(application.applicationId)
      .delete()
  }

  getApplications(): Observable<any> {
    return this.afs
      .collection('applications')
      .valueChanges({ idField: 'applicationId' })
  }

  async apply(application: any): Promise<any> {
    return await this.afs
      .collection('applications')
      .add(application)
  }

  // Conferences and sessions adding/updating/deleting
  async addData(data: any, collection: string) {
    return await this.afs
      .collection(collection)
      .add(data)
  }

  getData(collection: string): Observable<any> {
    return this.afs
      .collection(collection)
      .valueChanges({ idField: 'id' })
  }

  async updateData(data: any, collection: string) {
    return await this.afs
      .collection(collection)
      .doc(data.id)
      .set(data)
  }

  async deleteData(data: any, collection: string): Promise<void> {
    return await this.afs
      .collection(collection)
      .doc(data.id)
      .delete();
  }
}
