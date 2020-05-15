import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Platform, IonLabel } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filterposts',
  templateUrl: './filterposts.page.html',
  styleUrls: ['./filterposts.page.scss'],
})
export class FilterpostsPage implements OnInit {

  constructor(private routerinbox: ActivatedRoute,public navCtrl: NavController,public platform: Platform,private apiService: ApiService, private apiwebservice:ApiwebService) { }
  filterposts:any;
  fdt:string;
  tdt:string;
  
  ngOnInit() {

    this.routerinbox.queryParams.subscribe(params => {
      this.fdt = params["fromdate"];
      this.tdt= params["todate"];
      
      
  });

  }
  getExtension(post)
  {
    var selected_file=post.attachment;
      
    
    var lastDot = selected_file.lastIndexOf('.');

  var fileName = post.attachment.substring(0, lastDot);
  var ext = post.attachment.substring(lastDot + 1);
  return ext;
  }

  FilterPostclick(cat:string,ttle:string,desc:string,attach:string,PId:string,pby:string,dte:string)
  {
    console.log(pby);
    console.log(dte);
   
    var dt = dte.split('T');
    console.log(dt[0]);
    console.log("data passed");
    let navigationExtras: NavigationExtras = {
      queryParams: {
        category: cat,
        title: ttle,
        description:desc,
        attachment:attach,
       postid:PId,
      publishedby:pby,
      date:dt[0]
      }
      }
   this.navCtrl.navigateForward(['description'],navigationExtras);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => { 
    
    
      this.apiwebservice.getFilterposts(this.fdt,this.tdt).subscribe((data:any[])=>{
        console.log("entered filter");
    console.log(data);
    this.filterposts=data;
      var obj=Object.values(this.filterposts)[1];
      console.log("obj");
      console.log(obj);
      this.filterposts=obj;
    
      }) 
    
    // else{
    //   console.log("this is mobile");
    //   this.apiService.getFilterpostsMobile(this.fdt,this.tdt).then((data)=>{
    //     console.log("entered filter");
    // console.log(data);
    // this.filterposts=data;
    //   var obj=Object.values(this.filterposts)[1];
    //   console.log("obj");
    //   console.log(obj);
    //   this.filterposts=obj;
    
    //   }) 
      
    // }
    });
  }
}
