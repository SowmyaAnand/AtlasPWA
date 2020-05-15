import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabspagePageRoutingModule } from './tabspage-routing.module';

import { TabspagePage } from './tabspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabspagePageRoutingModule
  ],
  declarations: [TabspagePage]
})
export class TabspagePageModule {}
