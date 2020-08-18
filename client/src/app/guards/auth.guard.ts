import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserService } from './../services/user.service';
import { APIService } from 'src/app/services/api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private apiService: APIService
  ) {}
  canActivate(): Observable<boolean> {
    if (this.userService.getUser()) return of(true);
    else if (this.storageService.getToken(Constants.TOKEN)) {
      return this.apiService.getUser().pipe(
        map((data: { response: User; status: boolean }) => {
          this.userService.setUser(data.response);
          return true;
        }),
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/auth']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/']);
      return of(false);
    }
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
