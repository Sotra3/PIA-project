import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  trenutni: User = new User();
  private router= inject(Router)
  ngOnInit(): void {
    const raw = localStorage.getItem('ulogovan');
    const user = raw ? JSON.parse(raw) : null;  
    this.trenutni = user;
  }
  urediPodatke(){
    localStorage.setItem("ulogovan", JSON.stringify(this.trenutni))
    this.router.navigate(['/edit'])
  }
}
