import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { arrayUnion, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Conference } from '../models/conference';

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
      .doc(application.applicationId).delete()
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

  // Leadership Academy conferences
  async addLeadershipAcademyCountry(country: any) {
    return await this.afs
      .collection('leadership-academy-countries')
      .add(country)
  }

  getLeadershipAcademyCountries(): Observable<any> {
    return this.afs
      .collection('leadership-academy-countries')
      .valueChanges({ idField: 'id' })
  }

  async addLeadershipAcademyConference(country: Conference) {
    return await this.afs
      .collection('leadership-academy-countries')
      .doc(country.id)
      .update({ conferences: country.conferences })
  }

  async deleteLeadershipAcademyCountry(country: any): Promise<void> {
    return await this.afs
      .collection('leadership-academy-countries')
      .doc(country.id)
      .delete();
  }

  async deleteLeadershipAcademyConference(country: any): Promise<void> {
    return await this.afs
    .collection('leadership-academy-countries')
    .doc(country.id)
    .update({ conferences: country.conferences })
  }

  // Files
  async setObj(data: any): Promise<any> {
    if (this.router.url.includes('leadership-academy')) {
      return await this.afs
      .collection('leadership-academy-countries')
      .doc(data.id)
      .set(data)
    }
  }
}
