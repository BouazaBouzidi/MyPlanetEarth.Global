import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire:AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string, title: string) {
  this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['OK']
  }).present();
  }

  signInUser() {
    
    var myemail = this.user.value.trim();
    this.fire.auth.signInWithEmailAndPassword( myemail, this.password.value )
    .then( data => {
      this.navCtrl.setRoot( LoggedinPage );
    })
    .catch( error => {
      this.alert(error.message,"Oups!");
    })
  }

  register() {
  	this.navCtrl.push(RegisterPage);
  }
  forgot() {
  	this.navCtrl.push(ForgotPage);
  }

}
