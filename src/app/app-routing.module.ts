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
