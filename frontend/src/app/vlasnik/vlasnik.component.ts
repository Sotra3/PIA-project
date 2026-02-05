import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vlasnik',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './vlasnik.component.html',
  styleUrl: './vlasnik.component.css'
})
export class VlasnikComponent {
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
