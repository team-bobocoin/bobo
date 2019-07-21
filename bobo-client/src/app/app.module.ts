import {FormsModule} from '@angular/forms';
import {MbscModule} from '@mobiscroll/angular';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HellpeeService} from '../shared/services/hellpee.service';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../shared/services/user.service';
import {TransactionService} from '../shared/services/transaction.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        FormsModule,
        MbscModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        HellpeeService,
        UserService,
        TransactionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
