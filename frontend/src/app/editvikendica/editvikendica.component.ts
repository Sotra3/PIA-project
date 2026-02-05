import { Component, inject } from '@angular/core';
import { Vikendice } from '../models/vikendice';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { VikendiceService } from '../services/vikendice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editvikendica',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editvikendica.component.html',
  styleUrl: './editvikendica.component.css'
})
export class EditvikendicaComponent {
  vikendica:Vikendice=new Vikendice()
  width: number = 150;
  height: number = 150;
  private snackBar=inject(MatSnackBar)
  private location = inject(Location);
  private vikendicaService=inject(VikendiceService)
  private router=inject(Router)
   ngOnInit(): void {
    const raw = localStorage.getItem('editvikendica');
    const tren = raw ? JSON.parse(raw) : null;  
    this.vikendica = tren;
  }
  sacuvajIzmene() {
    if(this.vikendica.cenovnik.letnji==0||this.vikendica.cenovnik.zimski==0||this.vikendica.ime==""||
      this.vikendica.mesto==""||this.vikendica.telefon==""||this.vikendica.usluge==""){
        this.snackBar.open('❌Niste uneli sve podatke!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        return;
      }
       this.vikendicaService.editVikendica(this.vikendica).subscribe(k=>{
        if(k=="uspesno"){
        this.snackBar.open('✅ Podaci uspesno promenjeni!', 'Zatvori', {duration: 3000,horizontalPosition: 'center',verticalPosition: 'bottom',panelClass: ['snackbar-success']})
          this.location.back();
      }else{
            this.snackBar.open('❌Greška!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        }
      })
  }

   uploadSlike(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const img = new Image();

        img.onload = () => {
          
          this.width = img.width;
          this.height = img.height;
          const reader = new FileReader();
          reader.onload = () => {
          this.vikendica.slike.push(reader.result as string);
          };
          reader.readAsDataURL(file);
        };
        img.src = URL.createObjectURL(file);
      }
    }

    goBack(): void {
      this.location.back();
    }
}
