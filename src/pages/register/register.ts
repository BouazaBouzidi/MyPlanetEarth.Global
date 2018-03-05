import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') user;
	@ViewChild('password') password;
  @ViewChild('firstName') fname;
	@ViewChild('lastName') lname;
  @ViewChild('cpassword') cpassword;

  constructor(private alertCtrl: AlertController,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Hey!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    if(this.password.value + '' === this.cpassword.value + ''){
                this.fire.auth.createUserWithEmailAndPassword(this.user.value , this.password.value)
                .then(data => {
                  console.log('got data ', data);
                  this.alert('Registered! Welcome ' + this.fname.value + '');
                })
                .catch(error => {
                  console.log('got an error ', error);
                  this.alert(error.message);
                });
              	console.log('Would register user with ', this.user.value, this.password.value);
              }
  else{

              this.alert('Not matching passwords!');

  }
}
}
