import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import {Product} from '../product/product';
import {AlertController, NavController } from 'ionic-angular';

import {SharedService} from '../../services/sharedservice';


@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = Product;
    tab2Root = AboutPage;
    //tab3Root = ContactPage;

    constructor(public alert: AlertController, public navCtrl: NavController, public _service: SharedService) {}

    showAlert() {
        let alert = this.alert.create(
            {
                title: 'Warning!',
                subTitle: 'Clicking "Proceed" will reset all the information entered.',
                buttons: [
                    {
                        role: 'cancel',
                        text: 'Cancel',
                        handler: () => {
                        }
                    },
                    {
                        text: 'Proceed',
                        handler: () => {}
                    }]
            });
        alert.present();
    }


    //navigateToPage() {
    //    this.navCtrl.push(Product, { productData: this._service.getProductData() });
    //}
}
