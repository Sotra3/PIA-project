import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { RezervacijeService } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacija';
import { VikendiceService } from '../services/vikendice.service';

@Component({
  selector: 'app-rezervacije',
  standalone: true,
  imports: [],
  templateUrl: './rezervacije.component.html',
  styleUrl: './rezervacije.component.css'
})
export class RezervacijeComponent {
  trenutni: User=new User();
  private rezervacijeService = inject(RezervacijeService);
  private vikendicaService=inject(VikendiceService)
  rezervacije: Rezervacija[]=[];
  mesto:string=""
  ngOnInit(): void {
    const raw = localStorage.getItem('ulogovan');
    const user = raw ? JSON.parse(raw) : null;  
    this.trenutni = user;
    this.rezervacijeService.allRezervacije(this.trenutni.username).subscribe(k=>{
      this.rezervacije=k; 
    })
    
    }

    formatDatum(datum: Date): string {
      const date = new Date(datum);
      const dan = date.getDate().toString().padStart(2, '0');
      const mesec = (date.getMonth() + 1).toString().padStart(2, '0');
      const godina = date.getFullYear();
      const sati = date.getHours().toString().padStart(2, '0');
      const minuti = date.getMinutes().toString().padStart(2, '0');
      
      return `${dan}.${mesec}.${godina}. ${sati}:${minuti}`;
  }
}
