import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Vikendice } from '../models/vikendice';
import { VikendiceService } from '../services/vikendice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  turisti:User[]=[]
  vlasnici:User[]=[]
  zahtevi:User[]=[]
  vikendice:Vikendice[]=[];
  private vikendikceService=inject(VikendiceService)
  private userService=inject(UserService)
  private router = inject(Router)
  private snackBar=inject(MatSnackBar)
  ngOnInit(){
    this.getTuristi();
    this.getVlasnici();
    this.getZahtevi();
    this.getVikendice();
  }
  izmeniKorisnika(user:User){
    localStorage.setItem("ulogovan", JSON.stringify(user))
    this.router.navigate(['/edit'])
  }
 /* obrisiKorisnika(user:User){
    this.userService.obrisiKorisnika(user).subscribe((data:string)=>{
      if(data=="Uspesno"){
        alert(data)
        this.getTuristi();
        this.getVlasnici();
        this.getZahtevi();
      }
    })
  }*/

  deaktivirajKorisnika(user:User){
    this.userService.deaktivirajKorisnika(user).subscribe((data:string)=>{
      if(data=="Uspesno"){
        this.snackBar.open('✅ Korisnik uspešno deaktiviran!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
        this.getTuristi();
        this.getVlasnici();
        this.getZahtevi();
      }
      else{
        this.snackBar.open('❌Greska!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
      }
    })
  }

  prihvatiZahtev(user:User){
    this.userService.prihvatiZahtev(user).subscribe((data:string)=>{
      if(data=="Uspesno"){
        this.snackBar.open('✅ Zahtev uspešno prihvacen!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
        this.getTuristi();
        this.getVlasnici();
        this.getZahtevi();
      }
      else {this.snackBar.open('❌Greska!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
    }
    })
  }

  odbijZahtev(user:User){
    this.userService.odbijZahtev(user).subscribe((data:string)=>{
      if(data=="Uspesno"){
        this.snackBar.open('✅ Zahtev uspešno odbijen!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
        this.getTuristi();
        this.getVlasnici();
        this.getZahtevi();
      }
      else{
        this.snackBar.open('❌Greska!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})    
      }
      })
  }

  getTuristi(){
    this.userService.getTuristi().subscribe((data:User[])=>{
      this.turisti=data
    })
  }

  getVlasnici(){
    this.userService.getVlasnici().subscribe((data:User[])=>{
      this.vlasnici=data
    })
  }

  getZahtevi(){
    this.userService.getZahtevi().subscribe((data:User[])=>{
      this.zahtevi=data
    })
  }

  getVikendice(){
    this.vikendikceService.getVikendice().subscribe((data:Vikendice[])=>{
      this.vikendice=data
    })
  }
}
