import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private http = inject(HttpClient);

  uri = "http://localhost:4000/user";

  login(username: string, password: string, type: string) {
    let data = {
      username: username, password: password, type: type
    }
    return this.http.post<User>(`${this.uri}/login`, data)
  }
  
  getTuristi(){
    return this.http.get<User[]>(`${this.uri}/getTuristi`)
  }

  getVlasnici(){
    return this.http.get<User[]>(`${this.uri}/getVlasnici`)
  }
  prihvatiZahtev(data:User){
    return this.http.post<string>(`${this.uri}/prihvatiZahtev`, data)
  }
  odbijZahtev(data:User){
    return this.http.post<string>(`${this.uri}/odbijZahtev`,data)
  }
  getZahtevi(){
    return this.http.get<User[]>(`${this.uri}/getZahtevi`)
  }

  register(data:User){
    return this.http.post<string>(`${this.uri}/register`, data,{responseType: 'text' as 'json'})
  }
  changePassword(username: string, oldPassword: string, newPassword: string) {
    return this.http.post<string>(`${this.uri}/changePassword`, {
        username, oldPassword, newPassword
    });
}
  edit(data:User){
    return this.http.post<string>(`${this.uri}/edit`, data,{responseType: 'text' as 'json'})
  }
  deaktivirajKorisnika(data:User){
    return this.http.post<string>(`${this.uri}/deaktivirajKorisnika`, data)
  }

  obrisiKorisnika(data:User){
    return this.http.delete<string>(`${this.uri}/obrisiKorisnika/${data.username}`)
  }
}
