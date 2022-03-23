import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './main/cart/cart.component';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './main/orders/orders.component';
import { PackagesComponent } from './main/packages/packages.component';
import { PlaceOrderComponent } from './main/place-order/place-order.component';
import { ProfileComponent } from './main/profile/profile.component';
import { TestsComponent } from './main/tests/tests.component';
import { SingleComponent } from './main/single/single.component';
import { UploadPrescriptionComponent } from './main/upload-prescription/upload-prescription.component';
import { AccountComponent } from './main/account/account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'packages',
        component: PackagesComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'tests',
        component: TestsComponent
      },
      {
        path: 'tests/:id',
        component: TestsComponent
      },
      {
        path: 'place-order/:id',
        component: PlaceOrderComponent
      },
      {
        path: 'single/:id/:id1',
        component: SingleComponent
      },
      {
        path: 'upload',
        component: UploadPrescriptionComponent
      }
    ]
  },
  {
    path: 'registration-success',
    loadChildren: () => import('./registration-success/registration-success.module').then( m => m.RegistrationSuccessPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
