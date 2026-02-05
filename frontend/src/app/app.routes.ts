import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { TuristaComponent } from './turista/turista.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminComponent } from './admin/admin.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { RegisterComponent } from './register/register.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProfilComponent } from './profil/profil.component';
import { VikendiceComponent } from './vikendice/vikendice.component';
import { RezervacijeComponent } from './rezervacije/rezervacije.component';
import { EditComponent } from './edit/edit.component';
import { VikendicaDetaljiComponent } from './vikendica-detalji/vikendica-detalji.component';
import { NovarezervacjaComponent } from './novarezervacja/novarezervacja.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { VlasnikvikendiceComponent } from './vlasnikvikendice/vlasnikvikendice.component';
import { VlasnikrezervacijeComponent } from './vlasnikrezervacije/vlasnikrezervacije.component';
import { EditvikendicaComponent } from './editvikendica/editvikendica.component';
import { adminGuard } from './guards/admin.guard';
import { turistaGuard } from './guards/turista.guard';
import { vlasnikGuard } from './guards/vlasnik.guard';

export const routes: Routes = [
    {path:'', component:NeregistrovaniComponent},
    {path:'login', component:LoginComponent},
    {path:'vlasnik', component:VlasnikComponent,
       children: [
    { path: 'profil', component: ProfilComponent },
    { path: 'vlasnikRezervacije', component: VlasnikrezervacijeComponent },
    { path: 'mojeVikendice', component: VlasnikvikendiceComponent },
    { path:'statistika', component:StatistikaComponent}
  ], canActivate:[vlasnikGuard]
},
{
  path: 'turista',
  component: TuristaComponent,
  children: [
    { path: 'profil', component: ProfilComponent },
    { path: 'vikendice', component: VikendiceComponent },
    { path: 'rezervacije', component: RezervacijeComponent },
    ],canActivate:[turistaGuard]
},
    {path:'adminlogin', component:AdminloginComponent},
    {path:'admin', component:AdminComponent, canActivate:[adminGuard]},
    {path:'register', component:RegisterComponent},
    {path:'changePassword', component:ChangepasswordComponent},
    {path:'edit', component:EditComponent},
    {path:'vikendice/vikendica-detalji', component:VikendicaDetaljiComponent},
    {path:'vikendice/novarezervacija', component:NovarezervacjaComponent},
    {path:'editvikendica', component:EditvikendicaComponent}
];
