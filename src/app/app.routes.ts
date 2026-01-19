import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main pages
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';

// IMPORT THE NEW DYNAMIC COMPONENT
// Note: Ensure your file is named 'blog-detail.ts' inside that folder
import { BlogDetail } from './pages/blog-detail/blog-detail'; 

// Services subpages
import { CctvServices } from './pages/services/cctv-services/cctv-services';
import { AlarmServices } from './pages/services/alarm-services/alarm-services';
import { VaultServices } from './pages/services/vault-services/vault-services';

export const routes: Routes = [
  // Main pages (these match your navbar)
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  
  /** * DYNAMIC BLOG ROUTE
   * This handles any ID you throw at it (e.g., /blog/vaults, /blog/alarms).
   * It uses the BlogDetailComponent as a master template.
   */
  { path: 'blog/:id', component: BlogDetail },

  // Services subpages
  { path: 'services/cctv', component: CctvServices },
  { path: 'services/alarm', component: AlarmServices },
  { path: 'services/vault', component: VaultServices },

  // Fallback route (any unknown path)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}