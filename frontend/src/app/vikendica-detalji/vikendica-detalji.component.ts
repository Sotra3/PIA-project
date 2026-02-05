import { Component, inject, AfterViewInit } from '@angular/core';
import { Vikendice } from '../models/vikendice';
import { VikendiceService } from '../services/vikendice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

declare var L: any; // Dodaj ovo

@Component({
  selector: 'app-vikendica-detalji',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vikendica-detalji.component.html',
  styleUrl: './vikendica-detalji.component.css'
})
export class VikendicaDetaljiComponent implements AfterViewInit { // Dodaj AfterViewInit
  trenutna: Vikendice = new Vikendice();
  private vikendicaService = inject(VikendiceService)
  private router = inject(Router)
  private location = inject(Location)
  tempArray: number[] = [1,2,3,4,5];
  private snackBar = inject(MatSnackBar);

  ngOnInit(){
    let temp = JSON.parse(localStorage.getItem("detalji")!)
    if(temp){
      this.trenutna = temp;
      this.vikendicaService.getOneVikendica(this.trenutna.ime).subscribe((vikendica: Vikendice) => {
        this.trenutna = vikendica;
        setTimeout(() => this.initMap(), 100);
      })
    } else {
      this.snackBar.open('❌Niste izabrali vikendicu', 'Zatvori', {
        duration: 3000, 
        horizontalPosition: 'center', 
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error']
      })           
    }
  }

  ngAfterViewInit() {
  }

  initMap() {
    const customIcon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const lat = this.trenutna.koordinate?.x || 44.0165; // Default Beograd
    const lng = this.trenutna.koordinate?.y || 21.0059;
    
    const map = L.map('map').setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`${this.trenutna.ime}<br>${this.trenutna.mesto}`)
      .openPopup();
  }

  avgOcena(v: Vikendice): number {
    let sumOcena = 0;
    for(let i = 0; i < v.ocene.length; i++){
      sumOcena = sumOcena + v.ocene[i];
    }
    if(sumOcena == 0) return 0;
    return Math.round((sumOcena/v.ocene.length) * 100) / 100;
  }

  rezervisi(){
    localStorage.setItem("rezervacija", JSON.stringify(this.trenutna))
    this.router.navigate(['vikendice/novarezervacija'])
  }

  goBack(): void {
    this.location.back();
  }
}
