import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}
  userDetails: User;
  ngOnInit(): void {
    this.userDetails = this.userService.getUser();
  }

  logout() {
    this.router.navigate(['/auth']);
    this.storageService.removeToken(Constants.TOKEN);
  }
}
