import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnersPage');
  }
getPartners(){
  
}
openURL(){ 
  //window.open('http://google.com', '_system');
  const options: InAppBrowserOptions = {
    zoom: 'no'
  }
  const browser = this.iab.create('https://google.com/','_self',options);
}
}