import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  private router=inject(Router)
  private userService=inject(UserService)
  private snackBar=inject(MatSnackBar)
  private location=inject(Location)
  oldPassword :string=""
  newPassword :string=""
  repeatedNewPassword :string=""
  changePassword(){
    const specialCharactersPattern=/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const passwordPattern = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/    

    const raw = localStorage.getItem('ulogovan');
    let user = raw ? JSON.parse(raw) : null;
    if(!user){
      this.snackBar.open('❌Niste ulogovani', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
      return;
    }
    if(this.oldPassword=="" || this.newPassword==""||this.repeatedNewPassword==""){
      this.snackBar.open('❌Niste uneli sve podatke!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
      return;
    }
    if(!this.newPassword.match(passwordPattern)){
        this.snackBar.open('❌Pogresan format lozinke!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
      return;
    }
      if(/^\d+$/.test(this.newPassword[0]) || (specialCharactersPattern.test(this.newPassword[0]))){
        this.snackBar.open('❌Lozinka ne sme pocinjati cifrom ili specijalnim karakterom!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
      if(this.newPassword!=this.repeatedNewPassword){
        this.snackBar.open('❌Lozinke se ne poklapaju!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
    this.userService.changePassword(user.username,this.oldPassword, this.newPassword).subscribe((res)=>{
      if(res=="Korisnik nije pronađen"){
        this.snackBar.open('❌Korisnik nije pronadjen!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
      if(res=="Stara lozinka nije tačna"){
        this.snackBar.open('❌Stara lozinka nije tacna!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
      if(res=="Nova lozinka ne sme biti ista kao stara"){
        this.snackBar.open('❌Nova lozinka ne sme biti ista kao stara!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
      if (res == 'Neuspesna promena lozinke"') {
        this.snackBar.open('❌Neuspesna promena lozinke!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
          this.snackBar.open('✅ Lozinka uspesno promenjena!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
        this.router.navigate(['/login'])
    })
  }
  goBack(){
    this.location.back()
  }
}
