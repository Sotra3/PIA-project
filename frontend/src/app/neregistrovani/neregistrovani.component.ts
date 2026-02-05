import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { VikendiceService } from '../services/vikendice.service';
import { Vikendice } from '../models/vikendice';
import { RezervacijeService } from '../services/rezervacije.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-neregistrovani',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,MatTableModule,MatSortModule,MatInputModule,MatButtonModule],
  templateUrl: './neregistrovani.component.html',
  styleUrl: './neregistrovani.component.css'
})
export class NeregistrovaniComponent {
  @ViewChild(MatSort) sort!: MatSort;
  private router = inject(Router);
  private userService=inject(UserService);
  private vikendicaService=inject(VikendiceService)
  private rezervacijaService=inject(RezervacijeService)
  numberOfVlasnici: number=0;
  numberOfTuristi: number=0;
  allVlasnici: User[] = [];  
  allTuristi: User[]=[];
  allVikendice = new MatTableDataSource<Vikendice>([]);
  displayedColumns: string[] = ['ime', 'mesto'];
  sortDirectionIme="asc";
  sortDirectionMesto="asc";
  sortField="";
  pretragaNaziv="";
  pretragaMesto="";
  last24=0
  last7=0
  last30=0

  ngOnInit(){
    this.vikendicaService.getVikendice().subscribe((vikendice: Vikendice[]) => {
      this.allVikendice.data = vikendice;
      this.allVikendice.sort = this.sort;
    });
    
    this.getLast24()
    this.getLast7()
    this.getLast30()
    this.getVlasnici();
   this.getTuristi();
}
  getVlasnici(){ 
    this.userService.getVlasnici().subscribe((users: User[]) => {
      this.allVlasnici = users;
      this.numberOfVlasnici=this.allVlasnici.length
    });  
  } 
  getTuristi(){
    this.userService.getTuristi().subscribe((users: User[])=>{
      this.allTuristi=users;
      this.numberOfTuristi=this.allTuristi.length
  });
  }
  login(){
    this.router.navigate(['/login'])
  }
  register(){
    this.router.navigate(['/register'])
  }
  /*sortBy(param: keyof Vikendice){
    this.sortField=param;
    if(param=="mesto"){
      if(this.sortDirectionMesto=="asc"){
        this.allVikendice.sort((a, b) => (a[param] > b[param] ? 1 : -1));
        this.sortDirectionMesto="dsc"
      }
      else{
        this.allVikendice.sort((a, b) => (a[param] < b[param] ? 1 : -1));
        this.sortDirectionMesto="asc"
      }
      return;
    }
    if(param=="ime"){
      if(this.sortDirectionIme=="asc"){
        this.allVikendice.sort((a, b) => (a[param] > b[param] ? 1 : -1));
        this.sortDirectionIme="dsc"
      }
      else{
        this.allVikendice.sort((a, b) => (a[param] < b[param] ? 1 : -1));
        this.sortDirectionIme="asc"
      }
      return;
    }
  }*/
  pretraga(){
      this.vikendicaService.getVikendice().subscribe((vikendice: Vikendice[]) => {
      const filtered = vikendice.filter(vikendica=>vikendica.ime.toLowerCase().includes(this.pretragaNaziv.toLowerCase())&&vikendica.mesto.toLowerCase().includes(this.pretragaMesto.toLowerCase()));
      this.allVikendice.data = filtered;
    });
  }
  cancel(){
    this.pretragaMesto="";
    this.pretragaNaziv="";
    this.vikendicaService.getVikendice().subscribe((vikendice: Vikendice[]) => {
      this.allVikendice.data = vikendice;
    });
  }
  getLast24(){
    this.rezervacijaService.getLast24().subscribe((data:number)=>{
      this.last24=data
    })
  }
  getLast7(){
    this.rezervacijaService.getLast7().subscribe((data:number)=>{
      this.last7=data
    })
  }
  getLast30(){
    this.rezervacijaService.getLast30().subscribe((data:number)=>{
      this.last30=data
    })
  }
  
  tempArray: number[] = [1,2,3,4,5];
  
  avgOcena(v: Vikendice): number {
    let sumOcena = 0;
    for(let i = 0; i < v.ocene.length; i++){
      sumOcena = sumOcena + v.ocene[i];
    }
    if(sumOcena == 0) return 0;
    return Math.round((sumOcena/v.ocene.length) * 100) / 100;
  }
}
