import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }
  private http = inject(HttpClient);
  
    uri = "http://localhost:4000/user";
  
    login(username: string, password: string) {
      let data = {
        username: username, password: password
      }
      return this.http.post<User>(`${this.uri}/adminlogin`, data)
    }
}
