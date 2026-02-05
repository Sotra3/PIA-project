import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent {
    trenutni: User = new User();
    defaultImg="../../assets/default.jpg"
    private router= inject(Router)
    ngOnInit(){
      
      
    const ulogovanJson = localStorage.getItem("ulogovan");
    if (ulogovanJson) {
    this.trenutni = JSON.parse(ulogovanJson);
  }
     if(this.trenutni.profileImage==""){
            this.trenutni.profileImage=this.defaultImg;
      }
}
  changePassword(){
      localStorage.setItem("ulogovan", JSON.stringify(this.trenutni))
      this.router.navigate(['/changePassword'])
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
