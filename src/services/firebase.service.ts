import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth = inject(Auth);
  private authStatusSubject = new BehaviorSubject(this.auth.currentUser);
  currentAuthStatus$ = this.authStatusSubject.asObservable();
  constructor() {}

  signUpWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getUser() {
    return this.auth.currentUser;
  }
  //get user status (is logged in or not)
  getAuthStatus() {
    this.auth.onAuthStateChanged((credential) => {
      if (credential) {
        console.log(credential);
        this.authStatusSubject.next(credential);
        console.log('usuario logado');
      } else {
        this.authStatusSubject.next(null);
        console.log('User ta deslogado');
      }
    });
  }
  //login with email and password
  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  //sign-out
  signOut() {
    return this.auth.signOut();
  }
}
