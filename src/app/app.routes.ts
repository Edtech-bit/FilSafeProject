import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';

// Services subpages
import { CctvServices } from './pages/services/cctv-services/cctv-services';
import { AlarmServices } from './pages/services/alarm-services/alarm-services';
import { VaultServices } from './pages/services/vault-services/vault-services';

// Brochures
import { CctvBrochure } from './pages/brochures/cctv-brochure/cctv-brochure';
import { AlarmBrochure } from './pages/brochures/alarm-brochure/alarm-brochure';
import { VaultBrochure } from './pages/brochures/vault-brochure/vault-brochure';

// ✅ Export the routes array
export const routes: Routes = [
  // Main pages
  { path: '', component: Home },             // Home page
  { path: 'products', component: Products }, // Products page
  { path: 'services', component: Services }, // Services page
  { path: 'contact', component: Contact },   // Contact page

  // Services subpages
  { path: 'services/cctv', component: CctvServices },
  { path: 'services/alarm', component: AlarmServices },
  { path: 'services/vault', component: VaultServices },

  // Brochure pages
  { path: 'brochures/cctv', component: CctvBrochure },
  { path: 'brochures/alarm', component: AlarmBrochure },
  { path: 'brochures/vault', component: VaultBrochure },

  // Fallback route (any unknown path)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
