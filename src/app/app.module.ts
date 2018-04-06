import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// pages import
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { ForgotPage } from '../pages/forgot/forgot';

//firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

//Geolocation import
import { Geolocation } from '@ionic-native/geolocation';

//firebase config
const config ={
  
  apiKey: "AIzaSyAsS8pDMfjEos0R8XkxdEaXw8exEk60AUA",
  authDomain: "myplanetearthapp.firebaseapp.com",
  databaseURL: "https://myplanetearthapp.firebaseio.com",
  projectId: "myplanetearthapp",
  storageBucket: "myplanetearthapp.appspot.com",
  messagingSenderId: "755244667181"
}

//camera import
import { Camera,CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    ForgotPage,
    LoggedinPage,
    RegisterPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    ForgotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
