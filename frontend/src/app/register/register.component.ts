import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
    private userService = inject(UserService)
    private router= inject(Router)
    private snackBar = inject(MatSnackBar);
    data: User = new User();
    width = 150;
    height = 150;
    cardType="unknown"
    
    register(){
      this.data.status="neaktivan"
     
      const specialCharactersPattern=/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
      const passwordPattern = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/    
      
      if (this.width < 100 || this.width > 300 || this.height < 100 || this.height > 300) {
        this.snackBar.open('❌Slika mora biti između 100x100 i 300x300 piksela.', 'Zatvori',{duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-error']
    })    
        return;
      }

      if ((!this.data.username) || (!this.data.password) || (!this.data.firstName) || (!this.data.lastName) || (!this.data.address) || (!this.data.phone)|| (!this.data.creditCard) || (!this.data.gender) || (!this.data.type)  || (!this.data.email)) {
        this.snackBar.open('❌ Morate uneti sve podatke', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
        return;
      }

      if (this.cardType=="unknown") {
        this.snackBar.open('❌ Nepravilan broj kartice', 'Zatvori',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    })    
        return;
      }

      if (!this.data.password.match(passwordPattern)) {
        this.snackBar.open('❌Pogresan format lozinke', 'Zatvori',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    })    

        return;
      } else if ((/^\d+$/.test(this.data.password[0]) || (specialCharactersPattern.test(this.data.password[0])))) {
        this.snackBar.open('❌PLozinka ne sme da pocinje cifrom ili specijalnim karakterom', 'Zatvori',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    })    
          return;
      }

      this.userService.register(this.data)
        .subscribe(k => {
      if(k=="Neuspesno dodat korisnik"){
        this.snackBar.open('❌Greska prilikom dodavanja', 'Zatvori',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    })
        return;
      }
      this.snackBar.open('✅ Korisnik uspešno registrovan!', 'Zatvori', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });

        });
    this.router.navigate([''])
    }

    saveImage(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const img = new Image();

        img.onload = () => {
          
          this.width = img.width;
          this.height = img.height;
          const reader = new FileReader();
          reader.onload = () => {
          this.data.profileImage = reader.result as string;
          };
          reader.readAsDataURL(file);
        };
        img.src = URL.createObjectURL(file);
      }
    }

    getCardType(): string {
      const dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;
      const masterRegex = /^(51|52|53|54|55)\d{14}$/;
      const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
    
      if (dinersRegex.test(this.data.creditCard)) return 'diners';
      if (masterRegex.test(this.data.creditCard)) return 'mastercard';
      if (visaRegex.test(this.data.creditCard)) return 'visa';
    
      return 'unknown';
    }

    onCardInput(){
      this.cardType=this.getCardType()
    }
    pocetna(){
      this.router.navigate([''])
    }
}