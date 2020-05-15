import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxdetailPage } from './inboxdetail.page';

const routes: Routes = [
  {
    path: '',
    component: InboxdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxdetailPageRoutingModule {}
