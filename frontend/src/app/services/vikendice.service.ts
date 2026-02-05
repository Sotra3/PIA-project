import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vikendice } from '../models/vikendice';

@Injectable({
  providedIn: 'root'
})
export class VikendiceService {

  constructor() { }
  private http = inject(HttpClient);
  
  uri = "http://localhost:4000/vikendice";

  getVikendice(){
      return this.http.get<Vikendice[]>(`${this.uri}/getVikendice`)
    }
  getOneVikendica(ime:string){
    return this.http.get<Vikendice>(`${this.uri}/getOneVikendica/${ime}`)
    }
  addVikendica(vikendica:Vikendice){
    return this.http.post<string>(`${this.uri}/addVikendica`, vikendica)
  }
  getMojeVikendice(vlasnik:string){
    return this.http.get<Vikendice[]>(`${this.uri}/getMojeVikendice/${vlasnik}`)
  }
  deleteVikendica(id:string){
    return this.http.delete<string>(`${this.uri}/deleteVikendica/${id}`)
  }
  editVikendica(vikendica:Vikendice){
    return this.http.post<string>(`${this.uri}/editVikendica`, vikendica)
  }
  updateVikendica(vikendica:Vikendice){
    return this.http.post<string>(`${this.uri}/updateVikendica`, vikendica);
  }
}