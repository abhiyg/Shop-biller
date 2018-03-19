import { Component } from '@angular/core';
import {AlertController, NavController, NavParams } from 'ionic-angular';
import {ProductModel} from '../../models/productmodel';
import {SharedService} from '../../services/sharedservice';
import * as jsPDF from 'jspdf';
import * as nodemailer from 'nodemailer';
//import {DbService} from '../../providers/db-service';
import {FileProvider} from '../../providers/file-provider';
import { File } from '@ionic-native/file';

@Component({
    selector: 'page-product',
    templateUrl: 'product.html'

})
export class Product {

    private products: ProductModel[];
    private vat1: number = 0;
    private vat2: number = 0;
    private vatMisc: number = 0;
    private totalBillAmout: number = 0;
    private totalDiscount: number = 0;
    private isDownloadDisabled: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public _service: SharedService
        , public _FileProvider: FileProvider //, private _dbService: DbService
    ) {
        if (!this.products) {
            this.products = [];
            this.addNewProduct();
        }
    }

    calculateItemPrice(item: ProductModel) {
        if (item.quantity > 0) {
            item.price = (item.quantity * item.pricePerQty) - (item.discount * item.pricePerQty) / 100;
            item.price += (item.tax * item.price / 100);
            item.price = Number(item.price.toFixed(3));
        }
        this.isDownloadDisabled = true;
    }

    calculateTotal() {
        let total = 0;
        let discount = 0;
        this.products.forEach(
            item => {
                total += item.price;
                discount += (item.discount * item.price / 100);
                if (item.price == 0 && this.products.length > 1) {
                    let index = this.products.indexOf(item);
                    console.log(index);
                    this.products.splice(index, 1);
                }
            }
        );
        this.totalDiscount = discount;
        this.totalBillAmout = total + (total * this.vat1 / 100) + (total * this.vat2 / 100) + (total * this.vatMisc / 100);
        this.totalBillAmout = Number(this.totalBillAmout.toFixed(3));
        this.isDownloadDisabled = this.totalBillAmout <= 0;
    }


    /**
    //stackoverflow.com/questions/21280055/html-to-pdf-by-javascript-how-can-i-add-css-or-table
    **/
    download(isEmail?: boolean) {
        let currentDate = new Date().toLocaleDateString();
        //let doc = new jsPDF();
        let doc = new jsPDF('p', 'pt', 'a4', true);
        //doc.text("Hello", 20, 20);

        let leftMargin: number = 2;
        let topMargin: number = 12;
        let topMarginTable = 55;
        let headerRowHeight = 13;
        let rowHeight = 9;
        let cellWidth = 45;

        doc.margins = 1;
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(9);

        doc.cell(leftMargin, topMargin, cellWidth + 100, headerRowHeight, "Description", 0);
        doc.cell(leftMargin + cellWidth, topMargin, cellWidth, headerRowHeight, "Quantity", 0);
        doc.cell(leftMargin + (cellWidth * 2), topMargin, cellWidth, headerRowHeight, "Tax", 0);
        doc.cell(leftMargin + (cellWidth * 3), topMargin, cellWidth, headerRowHeight, "Price", 0);

        let i = 0;
        this.products.forEach
            (
            item => {
                i++;
                doc.cell(leftMargin, topMargin, cellWidth + 100, headerRowHeight, item.description ? item.description : " ", i);
                doc.cell(leftMargin + cellWidth, topMargin, cellWidth, headerRowHeight, item.quantity.toString(), i);
                doc.cell(leftMargin + (cellWidth * 2), topMargin, cellWidth, headerRowHeight, item.tax.toString(), i);
                doc.cell(leftMargin + (cellWidth * 3), topMargin, cellWidth, headerRowHeight, item.price.toString(), i);
            });

        doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, "", 0);
        doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, "", 0);

        doc.cell(leftMargin, topMargin, (cellWidth * 2), headerRowHeight, "Total Discount", i + 1);
        doc.cell(leftMargin, topMargin, (cellWidth * 2), headerRowHeight, "Total Bill Payable", i + 1);

        doc.cell(leftMargin, topMargin, (cellWidth * 2), headerRowHeight, this.totalDiscount.toString(), 0);
        doc.cell(leftMargin, topMargin, (cellWidth * 2), headerRowHeight, this.totalBillAmout.toString(), 0);

        doc.cellInitialize();
        if (isEmail) {
            return doc;
        }
        doc.save(currentDate + '.pdf');

        this._FileProvider.downloadFile(doc);
    }

    addNewProduct() {
        this.products = this._service.getProductData();
    }

    removeProduct(index) {
        console.log(index);
        this.products.splice(index, 1);
    }

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
                            //Do nothing on cancel
                        }
                    },
                    {
                        text: 'Proceed',
                        handler: () => {
                            this.resetAll();
                        }
                    }]
            });
        alert.present();
    }

    save() {
        //this._dbService.createDb();
        //this._dbService.openDb();
    }


    sendMail(emailId: string) {
        if (this.validateEmail(emailId)) {
            let document = this.download(true);
            console.log(document);
        }
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: false
        });
        console.log(transporter);
        let mailOptions = {
            from: "Fred Foo<foo@blurdybloop.com>",
            to: "ygrocks@gmail.com",
            subject: "Hello",
            text: "Hello world ",
            html: "<b>Hello world "
        }
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
        });
    }

    downloadPdf() {
        //if (this.plt.is('cordova')) {
        //    this.pdfObj.getBuffer((buffer) => {
        //        var blob = new Blob([buffer], { type: 'application/pdf' });

        //        // Save the PDF to the data Directory of our App
        //        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
        //            // Open the PDf with the correct OS tools
        //            this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        //        })
        //    });
        //} else {
        //    // On a browser simply use download!
        //    this.pdfObj.download();
    }


    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emailAlert() {
        let alert = this.alert.create(
            {
                title: 'Send the bill via email',
                inputs: [
                    {
                        id: 'emailIdForBill',
                        name: 'Enter email address',
                        placeholder: 'Enter email address',
                        type: 'email'
                    }],
                buttons: [
                    {
                        role: 'cancel',
                        text: 'Cancel',
                        handler: () => {
                            //Do nothing on cancel
                        }
                    },
                    {
                        text: 'Send e-mail',
                        handler: () => {
                            this.sendMail(alert.data.inputs[0].value);
                        }
                    }]
            });
        alert.present();
    }

    resetAll() {
        this.products = [];
        this._service.setProductData(this.products);
        this.addNewProduct();
        this.vat1 = 0;
        this.vat2 = 0;
        this.vatMisc = 0;
        this.totalBillAmout = 0;
    }
}
