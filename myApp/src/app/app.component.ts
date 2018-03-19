import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alert: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      platform.registerBackButtonAction(this.exit);
      });
  }
  exit() {
      let alert = this.alert.create({
          title: 'Confirm',
          message: 'Do you want to exit?',
          buttons: [{
              text: "exit?",
              handler: () => { this.exitApp() }
          }, {
                  text: "Cancel",
                  role: 'cancel'
              }]
      })
      alert.present();
  }
  exitApp() {
      this.platform.exitApp();
  }

}
