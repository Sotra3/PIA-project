import { Component, inject, ViewChild } from '@angular/core';
import { Vikendice } from '../models/vikendice';
import { User } from '../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VikendiceService } from '../services/vikendice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vlasnikvikendice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vlasnikvikendice.component.html',
  styleUrl: './vlasnikvikendice.component.css'
})
export class VlasnikvikendiceComponent {
  @ViewChild('forma') forma!: NgForm;
  nova: Vikendice = new  Vikendice();
  vikendice:Vikendice[]=[];
  vikendiceVlasnik:User=new User();
  private snackBar = inject(MatSnackBar);
  width: number = 150;
  height: number = 150;
  mojeVikendice:Vikendice[]=[];
  error="";
  private vikendiceService= inject(VikendiceService)
  private router=inject(Router)
  ngOnInit(): void {
    const raw = localStorage.getItem('ulogovan');
    const user = raw ? JSON.parse(raw) : null;  
    this.vikendiceVlasnik = user;
    this.getMojeVikendice();
  }
  urediVikendicu(v:Vikendice){
    localStorage.setItem('editvikendica', JSON.stringify(v))
    this.router.navigate(['/editvikendica'])
  }

  getMojeVikendice(){
     this.vikendiceService.getMojeVikendice(this.vikendiceVlasnik.username).subscribe(data => {
      this.mojeVikendice=data;
    });
  }

  obrisiVikendicu(v_id:string){
    this.vikendiceService.deleteVikendica(v_id).subscribe(data => {
      this.error=data;
      this.getMojeVikendice();
    });
  }
   uploadSlike(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          const reader = new FileReader();
          reader.onload = () => {
            this.nova.slike.push(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    obrisiSliku(vikendicaId: string, slikaIndex: number) {
    const vikendica = this.mojeVikendice.find(v => v._id === vikendicaId);
    if (vikendica) {
      vikendica.slike.splice(slikaIndex, 1);
      this.vikendiceService.updateVikendica(vikendica).subscribe(data => {
        if(data == "uspesno") {
          this.snackBar.open('✅ Slika obrisana!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-success']});
        } else {
          this.snackBar.open('❌ Greška!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']});
        }
      });
    }
  }

  dodajVikendicu(){
      if ((!this.nova.ime) || (!this.nova.mesto) || (!this.nova.cenovnik) || (!this.nova.telefon) || (!this.nova.usluge)) {
            this.snackBar.open('❌Morate uneti sve podatke o vikendici!', 'Zatvori',{duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom',panelClass: ['snackbar-error']})           
        return;
      }
      this.nova.vlasnik=this.vikendiceVlasnik.username;
      this.vikendiceService.addVikendica(this.nova).subscribe(data => {
        if(data=="uspesno"){
          this.snackBar.open('✅ Uspešno dodata vikendica!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-success']})
        }else{
          this.snackBar.open('❌ Greška!', 'Zatvori', {duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: ['snackbar-error']})
        }
      this.getMojeVikendice();
      this.forma.reset();
      });
  }
}
