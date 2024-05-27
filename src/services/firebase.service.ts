import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user';
import { AngularFireModule } from '@angular/fire/compat';
import {
  addDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private reviewCollection = collection(this.firestore, 'review');
  private userCollection = collection(this.firestore, 'users');
  private authStatusSubject = new BehaviorSubject(this.auth.currentUser);
  private currentIdSubject = new BehaviorSubject<string>('');

  currentId$ = this.currentIdSubject.asObservable();
  currentAuthStatus$ = this.authStatusSubject.asObservable();

  constructor() {}

  getReviews(): Observable<Review[]> {
    return collectionData(this.reviewCollection, {
      idField: 'id',
    }) as Observable<Review[]>;
  }

  createFirestoreReview(review: Review) {
    return from(addDoc(this.reviewCollection, review));
  }

  createUserFireStore(user: User) {
    return from(addDoc(this.userCollection, user));
  }

  getUser(userId: string) {
    const userReference = doc(this.userCollection, userId);
    const id = getDoc(userReference);
    return from(getDoc(userReference));
  }

  async getUserIdByEmail(userEmail: string) {
    const queryByName = query(
      this.userCollection,
      where('email', '==', userEmail)
    );
    const querySnapshot = await getDocs(queryByName);
    return querySnapshot.docs[0].id;
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
        const currentEmail = credential.email;
        const queryByName = query(
          this.userCollection,
          where('email', '==', currentEmail)
        );
        const querySnapshot = getDocs(queryByName);
        querySnapshot.then((data) => {
          this.currentIdSubject.next(data.docs[0].id);
        });

        console.log('usuario logado');
      } else {
        this.authStatusSubject.next(null);
        this.currentIdSubject.next('');
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
