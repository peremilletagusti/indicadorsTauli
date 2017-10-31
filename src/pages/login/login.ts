import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider} from "../../providers/APIService/auth";
import { HomePage  } from "../home/home";
import { Storage } from '@ionic/storage';

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
  private infoLogin : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
              public authProvider: AuthProvider, public storage: Storage) {
    this.infoLogin = this.formBuilder.group({
      usuari: ['', Validators.required],
      password: [''],
    });
  }

  logForm(){
    this.authProvider.login(this.infoLogin.value).subscribe(res =>{
      console.log(res);
      //quan ja ens hem loguejat
      this.storage.ready().then(() => {
        this.storage.set("infoLogin", res);
      });  
      this.navCtrl.setRoot(HomePage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
