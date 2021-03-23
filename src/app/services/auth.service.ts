import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.store.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider)
      .then(credential => {
        this.router.navigateByUrl('/');
        this.snackbar.open('ログインしました！', null, { duration: 2000 });
        return this.updateData(credential.user);
      })
      .catch((error) => {this.snackbar.open('ログインできませんでした', null, { duration: 2000 })});
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/welcome');
      this.snackbar.open('ログアウトしました', null, { duration: 2000 });
    });
  }

  private updateData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.store.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName
    };
    return userRef.set(data, { merge: true });
  }
}
