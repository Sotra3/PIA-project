import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  /*npm install leaflet --legacy-peer-deps
npm install @types/leaflet --save-dev --legacy-peer-deps za mapu
 */

/* npm install @angular/material
npm install @angular/cdk za material
*/

/*npm install bcrypt
npm install @types/bcrypt za kriptovanje
*/

/*<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script> to u index.html */

/*, provideHttpClient(), provideAnimations(), provideHttpClient(), provideAnimations()   to pisem u app.config*/
