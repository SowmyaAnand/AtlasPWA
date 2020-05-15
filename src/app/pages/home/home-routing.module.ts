import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path:'Trending',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
      {
        path:'Innovation',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
      {
        path:'ITKey',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
      {
        path:'People',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
      {
        path:'Training',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
      {
        path:'CURRENTAFFAIRS',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
      {
        path:'Accolades',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
    
      },
   
      {
        path:'default',
        loadChildren: () => import('../../pages/tabspage/tabspage.module').then( m => m.TabspagePageModule) 
      },
      {
        path: '',
        redirectTo: '/home/Trending',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
