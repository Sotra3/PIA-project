import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  trenutni: User = new User();
  width: number = 150;
  height: number = 150;
  cardType="";
  private location = inject(Location);
  private userService=inject(UserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);  
  ngOnInit(): void {
    const raw = localStorage.getItem('ulogovan');
    const user = raw ? JSON.parse(raw) : null;  
    this.trenutni = user;
    this.cardType=this.getCardType();
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
            this.trenutni.profileImage = reader.result as string;
          };
          reader.readAsDataURL(file);
        };
        img.src = URL.createObjectURL(file);
      }
    }
    goBack(): void {
      this.location.back();
    }
    
    save(){
      if (this.width < 100 || this.width > 300 || this.height < 100 || this.height > 300) {
        this.snackBar.open('❌Slika mora biti između 100x100 i 300x300 piksela.', 'Zatvori',{duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-error']})
        return;
      }

      if ((!this.trenutni.username) || (!this.trenutni.password) || (!this.trenutni.firstName) || (!this.trenutni.lastName) || (!this.trenutni.address) || (!this.trenutni.phone)|| (!this.trenutni.creditCard) || (!this.trenutni.gender) || (!this.trenutni.type)  || (!this.trenutni.email)) {
        this.snackBar.open('❌Morate uneti sve podatke!', 'Zatvori', { duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-error']})
        return;
      }

      if (this.cardType=="unknown") {
        this.snackBar.open('❌Neispravan broj kartice!', 'Zatvori', { duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-error']})
       
        return;
      }

      this.userService.edit(this.trenutni).subscribe(k=>{
        if(k=="Uspesno"){
          localStorage.setItem("ulogovan", JSON.stringify(this.trenutni))
           this.snackBar.open('✅ Uspešno promenjeni podaci!', 'Zatvori', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          })
          this.goBack()
        }else{
        this.snackBar.open('❌Greška!', 'Zatvori',{duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-error']})
        }
      })
    }

    getCardType(): string {
      const dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;
      const masterRegex = /^(51|52|53|54|55)\d{14}$/;
      const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
    
      if (dinersRegex.test(this.trenutni.creditCard)) return 'diners';
      if (masterRegex.test(this.trenutni.creditCard)) return 'mastercard';
      if (visaRegex.test(this.trenutni.creditCard)) return 'visa';
    
      return 'unknown';
    }

    onCardInput(value: string) {
      this.trenutni.creditCard = value;
      this.cardType = this.getCardType();
  }

}
