import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  public rootPage: any = LoginPage ;
  showRoot = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public storage: Storage )
     {  
      
      this.storage.get('isLogged').then(logged => {
        if (logged) {
           this.rootPage = LoggedinPage;
           splashScreen.hide();
        }
        this.showRoot = true;
    });
        statusBar.styleDefault();
        splashScreen.hide();
  }
  
}

