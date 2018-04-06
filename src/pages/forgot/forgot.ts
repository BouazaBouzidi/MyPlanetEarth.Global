import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  @ViewChild('femail') femail;

  constructor(public navCtrl: NavController, public navParams: NavParams,private fire:AngularFireAuth, private alertCtrl: AlertController) {
  }

  alert(message: string) {
  this.alertCtrl.create({
    title: 'Hey!',
    subTitle: message,
    buttons: ['OK']
  }).present();
}

  resetPassword(femail): any {
    return this.fire.auth.sendPasswordResetEmail(this.femail.value + '').then(
      data => {this.alert('Success! Check your inbox to reset password!');
              this.navCtrl.push(LoginPage);
    }).catch(
        error => {
          this.alert(error.message);
        }

      );
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

}
