import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private reviewCollection = collection(this.firestore, 'review');

  private authStatusSubject = new BehaviorSubject(this.auth.currentUser);
  currentAuthStatus$ = this.authStatusSubject.asObservable();

  constructor() {}

  getReviews(): Observable<Review[]> {
    return collectionData(this.reviewCollection, {
      idField: 'id',
    }) as Observable<Review[]>;
  }

  signUpWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
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
