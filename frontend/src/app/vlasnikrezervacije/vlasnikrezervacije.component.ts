import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijeService } from '../services/rezervacije.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vlasnikrezervacije',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vlasnikrezervacije.component.html',
  styleUrl: './vlasnikrezervacije.component.css'
})
export class VlasnikrezervacijeComponent {
trenutni: User=new User();
rezervacije: Rezervacija[]=[];
private rezervacijeService = inject(RezervacijeService);
private snackBar=inject(MatSnackBar)
  ngOnInit(): void {
    const raw = localStorage.getItem('ulogovan');
    const user = raw ? JSON.parse(raw) : null;  
    this.trenutni = user;
    this.getNeobradjeneRezervacije()
  }
  formatDatum(datum: Date): string {
    const date = new Date(datum);
    const dan = date.getDate().toString().padStart(2, '0');
    const mesec = (date.getMonth() + 1).toString().padStart(2, '0');
    const godina = date.getFullYear();
    const sati = date.getHours().toString().padStart(2, '0');
    const minuti = date.getMinutes().toString().padStart(2, '0');
    
    return `${dan}.${mesec}.${godina}. ${sati}:${minuti}`;
  }

  potvrdiRezervaciju(id: string,komentar: string){
          this.rezervacijeService.potvrdiRezervaciju(id,komentar).subscribe(k=>{
            if(k=="uspesno"){
              this.snackBar.open('✅Rezervacija uspešno potvrđena!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-success']})
            }
            else {
        this.snackBar.open('❌Greška!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
            }
            this.getNeobradjeneRezervacije()

          })
  }

  odbijRezervaciju(id: string,komentar: string){
    if(komentar==""){
      this.snackBar.open('❌Niste uneli komentar!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
      return;
    }
      this.rezervacijeService.odbijRezervaciju(id,komentar).subscribe(k=>{
        if(k=="uspesno"){
          this.snackBar.open('✅Rezervacija uspešno odbijena!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
        }
        else {
        this.snackBar.open('❌Greška!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
        }
        this.getNeobradjeneRezervacije()

        })

  }
  getNeobradjeneRezervacije(){
    this.rezervacijeService.allNeobradjeneRezervacije(this.trenutni.username).subscribe(k=>{
    this.rezervacije=k; 
    this.rezervacije.sort((a, b) => new Date(b.datumRezervacje).getTime() - new Date(a.datumRezervacje).getTime());
    })
  }
}
