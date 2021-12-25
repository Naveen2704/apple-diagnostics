import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationSuccessPage } from './registration-success.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationSuccessPageRoutingModule {}
