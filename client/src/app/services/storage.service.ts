import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setToken(key, value): void {
    window.localStorage.setItem(key, value);
  }

  getToken(key): string {
    return window.localStorage.getItem(key);
  }

  removeToken(key): void {
    window.localStorage.removeItem(key);
  }
}
