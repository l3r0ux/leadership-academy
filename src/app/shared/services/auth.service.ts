import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  currentUser: any = null;

  constructor(
    private auth: AngularFireAuth,
    private firestoreService: FirestoreService
  ) {
    this.authStatusListener()
  }

  authStatusListener() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true
        this.setCurrentUser()
      } else {
        this.isLoggedIn = false
        this.currentUser = null
      }
    })
  }

  async login(email: string, password: string): Promise<any> {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout(): Promise<void> {
    return await this.auth.signOut();
  }

  async setCurrentUser(): Promise<any> {
    const currentUser = await this.auth.currentUser
    if (currentUser) {
      this.currentUser = await this.firestoreService.getUserDoc(currentUser.uid)
    }
  }
}
