import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpeeTabsPage } from './helpee-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: HelpeeTabsPage,
    children: [
      {
        path: 'market',
        children: [
          {
            path: '',
            loadChildren: '../market/market.module#MarketPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/helpee-tabs/market',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/helpee-tabs/market',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HelpeeTabsRouterModule {}
