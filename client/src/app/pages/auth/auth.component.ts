import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../constants';
import { APIService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private apiService: APIService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}
  tabs: Record<string, string> = Constants.tabs;
  currentTab: string = this.tabs.login;
  model: User = {
    name: '',
    password: '',
    email: '',
    phone: '',
  };
  @ViewChild('f') public userFrm: NgForm;
  ngOnInit(): void {}

  resetModel(): void {
    this.model = { name: '', password: '', email: '', phone: '' };
  }
  setTab(tab: string): void {
    this.currentTab = tab;
    this.resetModel();
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
  onSubmit(): void {
    if (this.currentTab == this.tabs.login)
      this.apiService.login(this.model.email, this.model.password).subscribe(
        (data) => {
          this.storageService.setToken(Constants.TOKEN, data.response.token);
          this.userService.setUser({
            name: data.response.user_details.name,
            email: data.response.user_details.email,
          });
          this.navigateToProducts();
        },
        (err) => {
          console.log(err);
          alert((err.error && err.error.response) || err.message);
        }
      );
    else if (this.currentTab == this.tabs.signup)
      this.apiService
        .signup(
          this.model.email,
          this.model.name,
          this.model.password,
          this.model.phone
        )
        .subscribe(
          (data) => {
            this.userFrm.resetForm();
            this.setTab(Constants.tabs.login);
            alert('User signed up. Please login');
          },
          (err) => {
            console.log(err);
            alert((err.error && err.error.response) || err.message);
          }
        );
  }
}
