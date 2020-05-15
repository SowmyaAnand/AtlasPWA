import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxdetailPageRoutingModule } from './inboxdetail-routing.module';

import { InboxdetailPage } from './inboxdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxdetailPageRoutingModule
  ],
  declarations: [InboxdetailPage]
})
export class InboxdetailPageModule {}
