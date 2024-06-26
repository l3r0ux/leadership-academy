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
        isPaulineStudent: false,
        programsEnrolled: []
    })
  }

  async getPaulineStudents(limit: number = 5): Promise<any> {
    const students: any = []

    await this.afs
      .collection('users', ref => ref.where('isPaulineStudent', '==', true).orderBy('email').limit(limit))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          const student = doc.data()
          student['id'] = doc.id
          students.push(student)
        });
      })

    return students
  }

  // Applications
  async acceptApplication(application: any) {
    let user: any = null

    await this.afs
      .collection('users')
      .doc(application.userId)
      .get()
      .forEach((snapshot: any) => {
        user = snapshot.data()
        if (!user.programsEnrolled.includes(application.program)) {
          user.programsEnrolled.push(application.program)
        }
        user.isPaulineStudent = user.programsEnrolled.includes('Pauline Leadership Training')
      })

    return await this.afs
      .collection('users')
      .doc(application.userId)
      .set(user)
  }

  async removeApplication(application: any) {
    return await this.afs
      .collection('applications')
      .doc(application.id)
      .delete()
  }

  async getApplications(limit: number = 5): Promise<any> {
    const applications: any = []

    await this.afs
      .collection('applications', ref => ref.orderBy('createdAt').limit(limit))
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

  async searchApplications(searchTerm: string): Promise<any> {
    let applications: any = []

    await this.afs
      .collection('applications', ref => ref.where('email', '==', searchTerm))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          const searchedApplication = doc.data()
          searchedApplication['id'] = doc.id
          applications.push(searchedApplication)
        });
      })
      return applications
  }

  // Pagination
  async loadMoreApplications(lastApplication: any): Promise<any> {
    const applications: any = []

    await this.afs
      .collection('applications', ref => ref.orderBy('createdAt').startAfter(lastApplication).limit(5))
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

  async getLastApplication() {
    let lastDoc

    await this.afs
      .collection('applications', ref => ref.orderBy('createdAt', 'desc').limit(1))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          lastDoc = doc.data()
          lastDoc['id'] = doc.id
        });
      })

    return lastDoc
  }

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

  async getLastSession(collection: string) {
    let lastDoc

    await this.afs
      .collection(collection, ref => ref.orderBy('date', 'desc').limit(1))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          lastDoc = doc.data()
          lastDoc['id'] = doc.id
        });
      })

    return lastDoc
  }

  async loadMoreStudents(lastStudent: any): Promise<any> {
    const students: any = []

    await this.afs
      .collection('users', ref => ref.where('isPaulineStudent', '==', true).orderBy('email').startAfter(lastStudent).limit(5))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          const student = doc.data()
          student['id'] = doc.id
          students.push(student)
        });
      })

    return students
  }

  async getLastStudent() {
    let lastDoc

    await this.afs
      .collection('users', ref => ref.where('isPaulineStudent', '==', true).orderBy('email', 'desc').limit(1))
      .get()
      .forEach((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
          lastDoc = doc.data()
          lastDoc['id'] = doc.id
        });
      })

    return lastDoc
  }

  // Conferences, sessions and students adding/updating/deleting
  async addData(data: any, collection: string) {
    const id = uuidv4()
    data.id = id
    
    return await this.afs
      .collection(collection)
      .doc(id)
      .set(data)
  }

  async getCountryData(collection: string): Promise<any> {
    const countries: any = []

      await this.afs
      .collection(collection, ref => ref.orderBy('country'))
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

  async getSessionData(collection: string, limit = 5, isClient = false): Promise<any> {
    if (isClient) {
      const sessions: any = []

      await this.afs
        .collection(collection, ref => ref.orderBy('date').where('isLive', '==', true).limit(limit))
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
      const sessions: any = []

      await this.afs
        .collection(collection, ref => ref.orderBy('date').limit(limit))
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

  async unenrollPaulineStudent(student: any): Promise<any> {
    const programIndex = student.programsEnrolled.indexOf('Pauline Leadership Training')
    if (programIndex !== -1) {
      student.programsEnrolled.splice(programIndex, 1)
      student.isPaulineStudent = false
    }

    return this.afs
      .collection('users')
      .doc(student.id)
      .set(student)
  }
}
