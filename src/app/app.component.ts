import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  public rootPage: any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public fire:AngularFireAuth)
     {

     platform.ready().then(() => {    

     firebase.auth().onAuthStateChanged(user => {
       
      if (user) {
          this.rootPage = LoggedinPage;
          statusBar.styleDefault();
          splashScreen.hide();
        }
        else{
          this.rootPage = LoginPage;
          statusBar.styleDefault();
          splashScreen.hide();
        }

      });

    });

  }
  
}



