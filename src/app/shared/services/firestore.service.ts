import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  async getUserDoc(userId: string): Promise<any> {
    const user = await this.afs.collection('users').doc(userId).ref.get()
    return user.data()
  }

  async apply(application: any): Promise<any> {
    return await this.afs.collection('applications').add(application)
  }
}
