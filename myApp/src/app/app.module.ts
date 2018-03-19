import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {SharedService} from '../services/sharedservice';

import { AboutPage } from '../pages/about/about';
//import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Product} from '../pages/product/product';
//import {ProductModel} from '../models/productmodel';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {DbService} from '../providers/db-service';
import {FileProvider} from '../providers/file-provider';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        //ContactPage,
        //HomePage,
        TabsPage,
        Product
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        //ContactPage,
        //HomePage,
        TabsPage,
        Product
    ],
    providers: [
      //  SQLite, SQLiteObject,
        DbService,
        File, FileTransfer, FileProvider,
        SharedService,
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }

