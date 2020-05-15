import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabspagePage } from './tabspage.page';

const routes: Routes = [
  {
    path: '',
    component: TabspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabspagePageRoutingModule {}
