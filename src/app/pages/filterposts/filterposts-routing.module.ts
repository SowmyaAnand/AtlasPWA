import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterpostsPage } from './filterposts.page';

const routes: Routes = [
  {
    path: '',
    component: FilterpostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterpostsPageRoutingModule {}
