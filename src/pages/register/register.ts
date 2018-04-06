import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';


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

  constructor(private alertCtrl: AlertController,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams , public fdb: AngularFireDatabase ) {
  }

  ionViewDidLoad() {
  }

  alert(message: string, title: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {

    var myemail = this.user.value.trim();

    if(this.password.value + '' === this.cpassword.value + '' && this.fname.value != 0 && this.lname.value != 0 ){
                this.fire.auth.createUserWithEmailAndPassword(myemail , this.password.value)
                .then(data => {
                  
                firebase.database().ref(`Users/` + `${this.fire.auth.currentUser.uid}/`).push({
                    FirstName : this.fname.value,
                    LastName : this.lname.value,
                    Uid : this.fire.auth.currentUser.uid,
                    Email : this.user.value
                })
                  this.alert('Hey ' + this.fname.value + ', Please enter the tree specie!' , "Welcome!");
                  this.navCtrl.push(LoggedinPage);
                })
                .catch(error => {
                  
                  this.alert(error.message,"Oups!");
                });
              }
    else if(this.fname.value == 0 ) {
                this.alert('Please enter a first name to register',"Oups!");
    }
    else if(this.lname.value == 0 ) {
                this.alert('Please enter a last name to register',"Oups!");
    }
    else {
                this.alert('Not matching passwords!',"Oups!");
    }
}
}
