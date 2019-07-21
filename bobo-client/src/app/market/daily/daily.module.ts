import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductListPage} from './daily.page';
import { PricePipe } from './price.pipe';
import { MbscModule } from '@mobiscroll/angular';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MbscModule,
        RouterModule.forChild([{path: '', component: ProductListPage}])
    ],
    declarations: [
        ProductListPage,
        PricePipe
    ]
})
export class ProductsPageModule {
}
