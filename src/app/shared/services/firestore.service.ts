import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, QueryDocumentSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { uuidv4 } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore
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
      .doc(application.id)
      .delete()
  }

  async getApplications(): Promise<any> {
    const applications: any = []

    await this.afs
      .collection('applications', ref => ref.orderBy('createdAt').limit(5))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          const application = doc.data()
          application['id'] = doc.id
          applications.push(application)
        });
      })
      return applications
  }

  async apply(application: any): Promise<any> {
    return await this.afs
      .collection('applications')
      .doc(application.id)
      .set(application)
  }

  // Pagination
  async loadMoreSessions(collection: string, lastSessionDate: any) {
    const sessions: any = []

    await this.afs
      .collection(collection, ref => ref.orderBy('date').startAfter(lastSessionDate).limit(5))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          const session = doc.data()
          session['id'] = doc.id
          sessions.push(session)
        });
      })
      return sessions
  }

  // Conferences and sessions adding/updating/deleting
  async addData(data: any, collection: string) {
    const id = uuidv4()
    data.id = id
    
    return await this.afs
      .collection(collection)
      .doc(id)
      .set(data)
  }

  async getData(collection: string): Promise<any> {
    if (collection.includes('sessions')) {
      const sessions: any = []

      await this.afs
        .collection(collection, ref => ref.orderBy('date').limit(5))
        .get()
        .forEach((querySnapshot: any) => {
          querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
            const session = doc.data()
            session['id'] = doc.id
            sessions.push(session)
          });
        })
        return sessions
    } else {
      const countries: any = []

      await this.afs
      .collection(collection, ref => ref.orderBy('country').limit(5))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          const country = doc.data()
          country['id'] = doc.id
          countries.push(country)
        });
      })
      return countries
    }
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
