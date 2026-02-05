import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router)
  private userService = inject(UserService)
  username:string="";
  password:string=""
  type:string=""
  private snackBar = inject(MatSnackBar);

  login() {
    if (this.username == "" || this.password == ""||this.type=="") {
        this.snackBar.open('❌ Niste uneli sve podatke', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
      return;
    }

    this.userService.login(this.username, this.password, this.type).subscribe(k => {
      if (k) {
        if(k.profileImage==""){
          k.profileImage="../../assets/default.jpg";}
          localStorage.setItem("ulogovan", JSON.stringify(k))
          this.snackBar.open('✅ Korisnik uspešno prijavljen!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
          this.router.navigate([k.type + '/profil'])
        }
         else {
        this.snackBar.open('❌Nepravilno unešeni podaci', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
        return;
      }
    })
  }
  pocetna(){
    this.router.navigate([''])
  }
}
