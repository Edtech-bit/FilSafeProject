import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main pages
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Admin } from './pages/admin/admin'; 
import { authGuard } from './auth/auth-guard';
import { Login } from './pages/login/login';

// Dynamic Blog Component
import { BlogDetail } from './pages/blog-detail/blog-detail'; 

// Services subpages
import { CctvServices } from './pages/services/cctv-services/cctv-services';
import { AlarmServices } from './pages/services/alarm-services/alarm-services';
import { VaultServices } from './pages/services/vault-services/vault-services';

export const routes: Routes = [
  // Main pages
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'login', component: Login },

  // PROTECTED ADMIN ROUTE
  // If this doesn't work, check your browser console for "AuthGuard Check"
  { 
    path: 'admin', 
    component: Admin, 
    canActivate: [authGuard] 
  },

  // Dynamic Blog Route
  { path: 'blog/:id', component: BlogDetail },

  // Services subpages
  { path: 'services/cctv', component: CctvServices },
  { path: 'services/alarm', component: AlarmServices },
  { path: 'services/vault', component: VaultServices },

  // Fallback route (MUST BE LAST)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}