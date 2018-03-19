import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform} from 'ionic-angular';


@Injectable()
export class DbService {

  //  public database: SQLite;

  //  constructor(public shoppingDB: SQLite, public db: SQLiteObject, private platform: Platform) { 

  //      this.platform.ready().then(() => {
  //          this.database = new SQLite();
  //          this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
  //              this.refresh();
  //          }, (error) => {
  //              console.log("ERROR: ", error);
  //          });
  //      });
  //}

  //  createDb()
  //  {
  //      this.shoppingDB.create(
  //          {
  //              name:"shoppingInfo.db",
  //              location:"default"
  //          });
  //  }

  //  openDb()
  //  {
  //      this.db.open();
  //      console.log(this.db.openDBs);
  //  }

  //  createTable()
  //  {

  //  }


  //  saveShoppingInfo()
  //  {

  //  }


  //  fetchShoppingInfo()
  //  {

  //  }
}
