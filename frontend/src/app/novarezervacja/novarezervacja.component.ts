import { Component, inject } from '@angular/core';
import { Vikendice } from '../models/vikendice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Rezervacija } from '../models/rezervacija';
import { User } from '../models/user';
import { RezervacijeService } from '../services/rezervacije.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novarezervacja',
  standalone: true,
  imports: [MatFormFieldModule ,MatNativeDateModule, MatInputModule,MatDatepickerModule, CommonModule, FormsModule],
  templateUrl: './novarezervacja.component.html',
  styleUrl: './novarezervacja.component.css'
})
export class NovarezervacjaComponent {
  
  korak=1;
  kreditnakartica:string="";
  vikendica:Vikendice=new Vikendice();
  cardType: string="unknown"
  dateOd: string = new Date().toISOString().slice(0, 16);
  dateDo: string = new Date().toISOString().slice(0, 16);
  brojDece=0;
  brojOdraslih=0;
  zahtevi:string="";
  private snackBar=inject(MatSnackBar)
  private location = inject(Location);
  turista:User=new User();
  novaRezervacija: Rezervacija=new Rezervacija()
  private rezervacijeService=inject(RezervacijeService);
  private router=inject(Router);
  ngOnInit(){
    const ulogovanJson = localStorage.getItem("rezervacija");
    if (ulogovanJson) {
    this.vikendica = JSON.parse(ulogovanJson);
    }
    const raw = localStorage.getItem('ulogovan');
    const user = raw ? JSON.parse(raw) : null;  
    this.turista = user;
    this.kreditnakartica=this.turista.creditCard
    this.onCardInput();
  }
  sledeci(){
    const datumOd = this.dateOd.split('T')[0];
    const vremeOd = this.dateOd.split('T')[1];
    const datumDo = this.dateDo.split('T')[0];
    const vremeDo = this.dateDo.split('T')[1];
    const danas = new Date().toISOString().split('T')[0];
    const satOd = parseInt(vremeOd.split(':')[0]);
    const satDo = parseInt(vremeDo.split(':')[0]);
    if(this.korak==1){
    if(this.brojOdraslih==0){
      this.snackBar.open('❌Broj odraslih ne sme biti 0!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
      return;
    }
    if(datumOd < danas){
        this.snackBar.open('❌Datum dolaska ne sme biti u prošlosti!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
      return;
    }
        if(datumDo <= datumOd){
        this.snackBar.open('❌Datum odlaska ne sme biti pre datuma dolaska', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
    return
  }
       
    if(satOd<14){
        this.snackBar.open('❌U vikendicu se može ući tek posle 14h!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
      return;
    }
    if(satDo>10){
        this.snackBar.open('❌Iz vikendice se mora izaći pre 10h!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
      return;
    }
      this.novaRezervacija.brojOdraslih=this.brojOdraslih;
      this.novaRezervacija.brojDece=this.brojDece;
      this.novaRezervacija.datumOd=new Date(this.dateOd);
      this.novaRezervacija.datumDo=new Date(this.dateDo);
      this.novaRezervacija.zahtevi=this.zahtevi;
      this.novaRezervacija.vikendicaIme=this.vikendica.ime;
      this.novaRezervacija.vikendicaMesto=this.vikendica.mesto;
      this.novaRezervacija.vikendicaVlasnik=this.vikendica.vlasnik;
      this.novaRezervacija.vikendicaId=this.vikendica._id;
      this.novaRezervacija.korisnik=this.turista.username;
      this.novaRezervacija.status="u obradi";
      localStorage.setItem("rezervacija", JSON.stringify(this.vikendica));
      this.snackBar.open('✅Rezervacija izabrana!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
      this.korak++;
    }
  }
  nazad(){
    if(this.korak==1) {this.location.back(); return}
    else this.korak--;
  }
  getFormattedDateOd(): string {
  return this.dateOd.replace('T', ' ');
  }

  getFormattedDateDo(): string {
    return this.dateDo.replace('T', ' ');
  }

  izracunajCenu(): number {
  const datumOd = new Date(this.dateOd);
  const datumDo = new Date(this.dateDo);
  
  let ukupnaCena = 0;
  let trenutniDatum = new Date(datumOd);
  
  while (trenutniDatum < datumDo) {
    const mesec = trenutniDatum.getMonth() + 1;
    const isLetnji = mesec >= 5 && mesec <= 8;
    
    const cenaPoNoci = isLetnji ? this.vikendica.cenovnik.letnji : this.vikendica.cenovnik.zimski;
    ukupnaCena += cenaPoNoci;
    
    trenutniDatum.setDate(trenutniDatum.getDate() + 1);
  }
  
  return ukupnaCena;
}

  getCardType(): string {
      const dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;
      const masterRegex = /^(51|52|53|54|55)\d{14}$/;
      const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
    
      if (dinersRegex.test(this.kreditnakartica)) return 'diners';
      if (masterRegex.test(this.kreditnakartica)) return 'mastercard';
      if (visaRegex.test(this.kreditnakartica)) return 'visa';
    
      return 'unknown';
    }

    onCardInput(){
      this.cardType=this.getCardType()
    }

plati(){
this.rezervacijeService.proveraRezervacije(this.vikendica.ime,this.dateOd, this.dateDo).subscribe(result => {
  if(this.cardType=='unknown'){
    this.snackBar.open('❌Nepravilan broj kartice!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
    return;
  }
  if (result=="dostupna") {
    this.novaRezervacija.datumRezervacje=new Date();
    this.rezervacijeService.rezervisi(this.novaRezervacija).subscribe(result => {
      if(result=="uspesno"){
      this.snackBar.open('✅Rezervacija uspešno rezervisana!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
        this.router.navigate(['/turista/vikendice']);
      }
      else{
        this.snackBar.open('❌Greška!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
      }
  });
} 
else {
        this.snackBar.open('❌Vikendica je zauzeta za izabrane datume!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
}
});
}
}
