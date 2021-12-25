import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationSuccessPageRoutingModule } from './registration-success-routing.module';

import { RegistrationSuccessPage } from './registration-success.page';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationSuccessPageRoutingModule,
    MaterialModule
  ],
  declarations: [RegistrationSuccessPage]
})
export class RegistrationSuccessPageModule {}
