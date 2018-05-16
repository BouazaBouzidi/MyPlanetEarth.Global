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
               {
                this.getPartners();
                }

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

  var dbRef = firebase.database().ref().child(`PartnersList/`);
  dbRef.once('value',snap => gotdata(snap));
  
  function gotdata(snap){
    let partnerNamesList: string[] = [];
    var test= snap.val();

              var Keys = Object.keys(test);
              for (var i = 0 ; i< Keys.length; i ++ ){
              var k = Keys[i]
              partnerNamesList += test[k].partnerName;
                                 }
      
    for (i = 0 ;  i <partnerNamesList.length ; i++){    

        var nameElement = document.createElement('h2');
        var descriptionElement = document.createElement('p');

        nameElement.textContent = partnerNamesList[i];
        descriptionElement.textContent = partnerNamesList[i];

        var getElement = document.getElementById("partnersName");
        getElement.appendChild(nameElement);
        getElement.appendChild(descriptionElement);
          
  }

  }

   }  

openURL(){ 

  //window.open('http://google.com', '_system');
  const options: InAppBrowserOptions = {
    zoom: 'no'
  }
  const browser = this.iab.create('https://myplanetearth.global','_self',options);

}
}