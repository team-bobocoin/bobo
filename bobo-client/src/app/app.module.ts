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

// Image Uploading
import { IonicStorageModule } from '@ionic/storage';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Camera} from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        FormsModule,
        MbscModule,
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios',
        }),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        HellpeeService,
        UserService,
        ImagePicker,
        TransactionService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
