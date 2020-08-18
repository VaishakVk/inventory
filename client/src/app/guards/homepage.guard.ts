import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserService } from './../services/user.service';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HomePageGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.userService.getUser()) this.router.navigate(['/products']);
    else if (this.storageService.getToken(Constants.TOKEN))
      this.router.navigate(['/products']);
    else this.router.navigate(['/auth']);

    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
