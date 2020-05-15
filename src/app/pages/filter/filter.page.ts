import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
fromdte:string;
todte:string;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  filterpage()
  {
    var frdt = this.fromdte.split('T');
    console.log("from date nd to date");
    console.log(frdt[0]);
    
    var tdt = this.todte.split('T');
    console.log(tdt[0]);
    let navigationExtras: NavigationExtras = {
      queryParams: {
          fromdate:frdt[0],
          todate:tdt[0]
      }
      }
   this.navCtrl.navigateForward(['filterposts'],navigationExtras);
     
  }

}
