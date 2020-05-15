import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterpostsPageRoutingModule } from './filterposts-routing.module';

import { FilterpostsPage } from './filterposts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterpostsPageRoutingModule
  ],
  declarations: [FilterpostsPage]
})
export class FilterpostsPageModule {}
