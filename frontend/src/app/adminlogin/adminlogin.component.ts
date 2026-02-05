import { Component, inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
private router = inject(Router)
  private adminService = inject(AdminService)
  private snackBar = inject(MatSnackBar);
  username:string="";
  password:string=""
  type:string=""
  login() {
    if (this.username == "" || this.password == "") {
        this.snackBar.open('❌Niste uneli sve podatke!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
      return;
    }
    this.adminService.login(this.username, this.password).subscribe(k => {
      if (k) {
        localStorage.setItem("ulogovan", JSON.stringify(k));
        this.router.navigate(['/admin'])
      } else {
        this.snackBar.open('❌Ne postoji korisnik!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
    })
  }
}
