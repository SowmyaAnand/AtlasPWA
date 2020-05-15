import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tabspage',
    loadChildren: () => import('./pages/tabspage/tabspage.module').then( m => m.TabspagePageModule)
  },
  {
    path: 'messagelist',
    loadChildren: () => import('./pages/messagelist/messagelist.module').then( m => m.MessagelistPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then( m => m.FilterPageModule)
  },
 
  {
    path: 'description',
    loadChildren: () => import('./pages/description/description.module').then( m => m.DescriptionPageModule)
  },
  {
    path: 'addpost',
    loadChildren: () => import('./pages/addpost/addpost.module').then( m => m.AddpostPageModule)
  },
  {
    path: 'inboxdetail',
    loadChildren: () => import('./pages/inboxdetail/inboxdetail.module').then( m => m.InboxdetailPageModule)
  },
  {
    path: 'filterposts',
    loadChildren: () => import('./pages/filterposts/filterposts.module').then( m => m.FilterpostsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
