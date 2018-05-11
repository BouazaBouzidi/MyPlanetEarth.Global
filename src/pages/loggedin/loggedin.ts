import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {LoginPage} from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { PartnersPage } from '../partners/partners';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';



@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

  photos: AngularFireList<any>;
  usersList: AngularFireList<any>; 
  photosList : AngularFireList<any>;

  @ViewChild('treespecie') treespecie;
  @ViewChild('comment') comment;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public navCtrl: NavController,public navParams: NavParams,private camera: Camera, 
              public fire :AngularFireAuth , public fdb: AngularFireDatabase , private geolocation: Geolocation
             ,public plt: Platform,private screenOrientation: ScreenOrientation) {
              
             this.plt.ready().then((readySource) => {
              this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
              console.log('Width: ' + plt.width());
              console.log('Height: ' + plt.height())
           //this.takePhoto();               
             });                    
    }
  ionViewDidLoad() {
    var show = true;
    var height = this.plt.height();
  }

  //Variables
  show: boolean = true;
  captureDataUrl: string;
  lat: number;
  long: number;

  
  alert(message: string , title: string) {
    this.alertCtrl.create({
     title: title,
     subTitle: message,
     cssClass: 'alert',
     buttons: ['OK']
   }).present();
   }

  mailto() {
    window.open(`mailto: idevkhmer@gmail.com`, '_system');
 }


  takePhoto(){
    this.geolocation.getCurrentPosition().then((resp) => {

       this.lat = resp.coords.latitude;
       this.long = resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  
    const options: CameraOptions = {
      quality : 100,
      targetHeight: 350,
      targetWidth: 280,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      correctOrientation : true
    }
      this.camera.getPicture(options).then((ImageData) => {

      this.show = false;
      this.captureDataUrl = 'data:image/jpg;base64,' + ImageData;
    }
   , (err) => {
          //alert(err.message);
        });

  }

  push(){
    this.navCtrl.push(PartnersPage);
  }
 

  upload() {
    
      if(this.treespecie.value.length < 2){
        alert("Tree specie is required!")
      }else{
      
      let load = this.loadingCtrl.create({
          spinner: 'bubbles',
          content:'Please Wait....',
          duration: 3000
      });
      load.present();


      var uid = this.fire.auth.currentUser.uid;
      var email = this.fire.auth.currentUser.email;
      var imageName = '_' + Math.random().toString(36).substr(2, 9);
      // date on current timezone
      var b = Number(new Date());
      var Time = new Date(b);
      
      var date = Time.toString();
      // date on UTC timezone
      var utcMinutes = Time.getUTCMinutes().toString();
      var utcHours = Time.getUTCHours().toString();
      var utcDay = Time.getUTCDate().toString();
      var utcMonth = Time.getUTCMonth().toString();
      var utcYear = Time.getUTCFullYear().toString();
      var allUtc = utcHours + ":" + utcMinutes + " "+ utcDay + "/" + utcMonth + "/" + utcYear ;

      this.photosList= this.fdb.list(`PhotosListByID/` + `${uid}/`);
      
      this.photosList.push({

        Treespecie: this.treespecie.value,
        Comment : this.comment.value,
        ImageName: imageName,
        Date: date,
        UTCdate: allUtc,
        Latitude: this.lat,
        Longitude: this.long,
        TakenbyUID: uid,
        TakenbyEMAIL : email
   }
        
    )
    
      
    
    this.photosList= this.fdb.list(`PhotosList/`);

    this.photosList.push({

      Treespecie: this.treespecie.value,
      Comment : this.comment.value,
      ImageName: imageName,
      Date: date,
      UTCdate: allUtc,
      Latitude: this.lat,
      Longitude: this.long,
      TakenbyUID: uid,
      TakenbyEMAIL : email

    }  
  )

  //`Email: ${email}/` + `UID: ${uid}/`
    var uploadTask = firebase.storage().ref().child( `images/` + imageName ).putString(this.captureDataUrl,'data_url');
      uploadTask.then(data => {
        load.dismiss();
        this.alert("The photo is sent. \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 You can check all trees in the Map." ,"Thank You!");
        this.captureDataUrl = "";
        this.show = true;

        var retry = document.getElementById("reverse");
        retry.innerText = "RETRY";
        
        this.navCtrl.setRoot(this.navCtrl.getActive().component);

      }).catch(error => {
          load.dismiss();
          this.alert(error.message,"Oups!");
          this.navCtrl.setRoot(LoginPage);      
      });
    }}
  }
