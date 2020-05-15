import { Baseurl, LoginApi } from './../ApiConstants';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GlobalService } from './../../global.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username:string;
password:string;
url:string;
  constructor(public navCtrl: NavController,public global:GlobalService,public alertController: AlertController,private menu : MenuController,private apiService: ApiService, private apiwebservice:ApiwebService, public platform: Platform) { }
  ngOnInit()
  
   {
this.global.LoginUsername="";
this.global.category_selected="";
this.global.title_displayed="";
this.global.type="";


  }
  simpleNotif() {
   
  }
  async presentAlert(headertext:string,messagetext:string) {
    const alert = await this.alertController.create({
      header:   headertext,
      message: messagetext,
      buttons: ['OK']
    });
    await alert.present();
  }

login()
{
  //this.navCtrl.navigateRoot('/home')
  this.apiwebservice.validatelogin(this.username,this.password);
   
  console.log("login button");
 

}


ionViewDidEnter() {
  this.menu.enable(false);
}
ionViewWillLeave() {
  this.menu.enable(true);
}


}
