import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { User } from '../models/user';
import { Vikendice } from '../models/vikendice';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  constructor() { }

  private http = inject(HttpClient);
    
  uri = "http://localhost:4000/rezervacije";

  proveraRezervacije(vikendica: string, datumOd: string, datumDo: string){
    return this.http.post<string>(`${this.uri}/proveraRezervacije`, {
      vikendica,
      datumOd,
      datumDo
    });
  }
  rezervisi(rezervacija:Rezervacija){
    return this.http.post<any>(`${this.uri}/rezervisi`, rezervacija);
  }

  allRezervacije(ime: string){
    return this.http.get<Rezervacija[]>(`${this.uri}/allRezervacije/${ime}`);
  }

  allNeobradjeneRezervacije(ime:string){
    return this.http.get<Rezervacija[]>(`${this.uri}/allNeobradjeneRezervacije/${ime}`);

  }
  odbijRezervaciju(id:string, komentarVlasnika:string){
    return this.http.post<string>(`${this.uri}/odbijRezervaciju`, { id: id , komentarVlasnika:komentarVlasnika});
  }
  potvrdiRezervaciju(id: string,komentarVlasnika:string){
    return this.http.post<string>(`${this.uri}/potvrdiRezervaciju`, { id: id , komentarVlasnika:komentarVlasnika});
  }

  getLast24(){
    return this.http.get<number>(`${this.uri}/getLast24`);
  }

  getLast7(){
    return this.http.get<number>(`${this.uri}/getLast7`);
  }
  
  getLast30(){
    return this.http.get<number>(`${this.uri}/getLast30`);
  }
  getRezervacija(id:string){
    return this.http.get<Rezervacija>(`${this.uri}/getRezervacija/${id}`);
  }
  
}

