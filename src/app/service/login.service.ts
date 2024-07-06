import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoggedInPermissionUsingBoolean {
  constructor(
    private angularFireDB: AngularFireDatabase
  ) {}

  canActivate(route, state): boolean {
    return localStorage.getItem('loginData') !== null;
  }

  getLogin(username: string){
    return this.angularFireDB.list('user', x => x.orderByChild('email').equalTo(username)).valueChanges();
  }
}
