import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
  this.alertCtrl.create({
    title: 'Hey!',
    subTitle: message,
    buttons: ['OK']
  }).present();
  }

  signInUser() {
    this.fire.auth.signInWithEmailAndPassword(this.user.value , this.password.value)
    .then( data => {
      console.log('got some data', this.fire.auth.currentUser);
      this.alert('Success! You\'re logged in');
      this.navCtrl.setRoot( LoggedinPage );
      // user is logged in
    })
    .catch( error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
  	console.log('Would sign in with ', this.user.value, this.password.value);
  }

  register() {
  	this.navCtrl.push(RegisterPage);
  }
  forgot() {
  	this.navCtrl.push(ForgotPage);
  }

}
