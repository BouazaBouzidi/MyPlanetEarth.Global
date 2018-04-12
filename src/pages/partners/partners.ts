import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html',
})
export class PartnersPage {

  partnersList: AngularFireList<any>; 

  constructor(public fdb : AngularFireDatabase, 
              public alertCtrl: AlertController, 
              public navCtrl: NavController, 
              public navParams: NavParams , 
              private iab: InAppBrowser)
               { }

  partnersObject: Object = {
    partnerName : "",
    partnerLogo : ""
  };

  partnerName: string;
  partnerDesc: string;
  partnerURL: string;
  
ionViewDidLoad() { }

alert(message: string ) {
    this.alertCtrl.create({
     title: "Hey",
     subTitle: message,
     buttons: ['OK']
   }).present();
   }

getPartners(){
  
  var dbRef = firebase.database().ref().child('PartnersList/');
  dbRef.once('value',snap =>  this.partnersObject= snap.val());
  return this.alert(this.partnersObject.toString());

   }  

openURL(){ 
  //window.open('http://google.com', '_system');
  const options: InAppBrowserOptions = {
    zoom: 'no'
  }
  const browser = this.iab.create('https://google.com/','_self',options);
}
}