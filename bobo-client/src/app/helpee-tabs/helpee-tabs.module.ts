import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HelpeeTabsPage } from './helpee-tabs.page';
import {HelpeeTabsRouterModule} from './helpee-tabs.router.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HelpeeTabsRouterModule
  ],
  declarations: [HelpeeTabsPage]
})
export class HelpeeTabsPageModule {}
