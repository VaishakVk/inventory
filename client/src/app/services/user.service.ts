import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: User;

  constructor() {}

  getUser(): User {
    return this.userDetails;
  }

  setUser(userDetails: User): void {
    this.userDetails = userDetails;
  }
}
