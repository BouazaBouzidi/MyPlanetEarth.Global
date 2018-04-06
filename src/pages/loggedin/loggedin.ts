import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable} from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage,AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase';
import {LoginPage} from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';



@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

  photos: AngularFireList<any>;
  usersList: AngularFireList<any>; 
  photosList: AngularFireList<any>; 
  @ViewChild('treespecie') treespecie;
  @ViewChild('comment') comment;

  constructor(public alertCtrl: AlertController, 
              public navCtrl: NavController,public navParams: NavParams,private camera: Camera, 
             public fire :AngularFireAuth , public fdb: AngularFireDatabase , private geolocation: Geolocation) {

              this.takePhoto();         
    }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoggedinPage');
  }
  //Variables
  captureDataUrl: string;
  lat: number;
  long: number;
 

  alert(message: string , title: string) {
    this.alertCtrl.create({
     title: title,
     subTitle: message,
     buttons: ['OK']
   }).present();
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
      this.captureDataUrl = 'data:image/jpg;base64,' + ImageData;
    }
   , (err) => {
          //alert(err.message);
        });
  }

    upload() {
      if(this.treespecie.value.length < 2){
        alert("Tree specie is required!")
      }else{

      var uid = this.fire.auth.currentUser.uid;
      var email = this.fire.auth.currentUser.email;
      var imageName = Math.random()*10000000000000000;
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
      //var MyPhotos = [];

      this.photosList= this.fdb.list(`PhotosList/`+ `${uid}/`);
      
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

      })

     /* firebase.database().ref(`Users/`).push({
        Email : email,
        uid : uid
      })*/

      // Get the current User 
      //const userObject = firebase.database().ref().child('Users/');
      //userObject.once('value',snap => snap.child()
      //);
    //var olddata  ; 

    //MyPhotos.push(imageName);

    //this.usersList = this.fdb.list(`Users/`+ `${uid}/`);

    //firebase.database().ref(`Users/`+ `${uid}/`).child("MyPhotos").once('value',snap => olddata = snap.val()) ;
    //this.alert(olddata,olddata)
    

      var uploadTask = firebase.storage().ref().child( `Email: ${email}/` + `UID: ${uid}/` + imageName ).putString(this.captureDataUrl,'data_url');
      uploadTask.then(data => {
        alert("The photo is sent");
        this.captureDataUrl = "";
        this.navCtrl.push(LoggedinPage);

      }).catch(error => {
          this.alert(error.message,"Oups!");
          this.navCtrl.setRoot(LoginPage);      
      });
    }}
  }

      /*
        let storageRef = this.store.ref;
        // Create a timestamp as filename
        const filename = Math.floor(Date.now() / 1000);

        // Create a reference to 'images/todays-date.jpg'
        storageRef.
        const imageRef = storageRef.child(`images/${filename}.jpg`);

        imageRef.putString(this.captureDataUrl , firebase.storage.StringFormat.DATA_URL).then(function(snapshot) {
          console.log('Uploaded a data_url string!');
        });
        */
    //this.camera.getPicture().then((imageData) => {
    //   this.imageURL = imageData
    //   this.photos.push({
    //     imageURL : this.imageURL
    //   }
    //   )
    //}, (err) => {
    //   console.log(err);
    // });