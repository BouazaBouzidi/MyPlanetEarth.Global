import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fire:AngularFireAuth,
     private alertCtrl: AlertController,private screenOrientation: ScreenOrientation,public storage: Storage ) {
      //this.navCtrl.setRoot( LoggedinPage );
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    //this.signin();
  }
  ionViewDidLoad() {
    console.log(this.fire.auth.currentUser);
  }

  
  alert(message: string, title: string) {
  this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['OK']
  }).present();
  }

  signInUser() {
    
    //console.log(this.fire.auth.currentUser);
    //console.log(this.fire.auth.currentUser.email);
    
    var myemail = this.user.value.trim();  

    this.fire.auth.signInWithEmailAndPassword( myemail, this.password.value )
    .then( 
      data => {
      //this.fire.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.navCtrl.push( LoggedinPage );
      this.storage.set('isLogged',true);
      //alert("OK");
    })
    .catch( error => {
      this.alert(error.message,"Oups!");
    }) }

  
  register() {
  	this.navCtrl.push(RegisterPage);
  }
  forgot() {
  	this.navCtrl.push(ForgotPage);
  }

}
