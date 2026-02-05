import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vikendice } from '../models/vikendice';
import { VikendiceService } from '../services/vikendice.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vikendice',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,MatTableModule,MatSortModule,MatInputModule,MatButtonModule],
  templateUrl: './vikendice.component.html',
  styleUrl: './vikendice.component.css'
})
export class VikendiceComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  tempArray:number[]=[1,2,3,4,5];
  private vikendicaService=inject(VikendiceService)
  allVikendice = new MatTableDataSource<Vikendice>([]);
  displayedColumns: string[] = ['ime', 'mesto', 'ocena'];
  sortDirectionIme="asc";
  sortDirectionMesto="asc";
  sortField="";
  pretragaNaziv="";
  pretragaMesto="";
  ngOnInit(){
    this.vikendicaService.getVikendice().subscribe((vikendice: Vikendice[]) => {
      this.allVikendice.data = vikendice;
      this.allVikendice.sort = this.sort;
    });
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
  avgOcena(v:Vikendice): number {
    let sumOcena=0;
    for(let i=0;i<v.ocene.length;i++){
      sumOcena=sumOcena+v.ocene[i];
    }
    if(sumOcena==0) return 0;
    return Math.round((sumOcena/v.ocene.length) * 100) / 100;
  }
  zapamti(vikendica:Vikendice){
    localStorage.setItem("detalji",JSON.stringify(vikendica))
  }
}