import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Platform, IonLabel } from '@ionic/angular';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';


@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.page.html',
  styleUrls: ['./messagelist.page.scss'],
})
export class MessagelistPage implements OnInit {
  posts = [];
  constructor(public navCtrl: NavController,public platform: Platform,private apiService: ApiService, private apiwebservice:ApiwebService) { }

  ngOnInit() {
    //  if(this.platform.is('desktop'))
    // {
    //   this.apiwebservice.getposts().subscribe((data:any[])=>{
    // console.log(data);
    // this.posts=data;
    //   var obj=Object.values(this.posts)[1];
    //   console.log("obj");
    //   console.log(obj);
    //   this.posts=obj;
      
    //   }) 
    // }
    // else{
    //   console.log("this is mobile");
    //  this.apiService.getpostsMobile().then(data =>{
    // console.log(data);
        
    //      var obj=Object.values(this.posts)[1];
    //   console.log("obj");
    //   console.log(obj);
    //   this.posts=obj;
      
    //   })
    // }
  
  }
  Inboxcardclick(cat:string,ttle:string,desc:string,attach:string,postid:number,publishedbyy:string,date:string,displydate:string)
  {
    console.log(publishedbyy);
    console.log(date);
   
    // var dt = date.split('T');
    // console.log(dt[0]);
    // console.log("data passed");
    let navigationExtras: NavigationExtras = {
      queryParams: {
          category: cat,
          title: ttle,
          description:desc,
          attachment:attach,
         postid:postid,
        publishedby:publishedbyy,
        date:date,
        displaydte:displydate
      }
      }
   this.navCtrl.navigateForward(['inboxdetail'],navigationExtras);
     
  }
  getExtension(post)
  {
    var selected_file=post.attachment;
      
    
    var lastDot = selected_file.lastIndexOf('.');

  var fileName = post.attachment.substring(0, lastDot);
  var ext = post.attachment.substring(lastDot + 1);
  return ext;
  }

  ionViewDidEnter()
   {
    this.platform.ready().then(() => { 
    
   
      this.apiwebservice.getposts().subscribe((data:any[])=>{
    console.log(data);
    this.posts=data;
      var obj=Object.values(this.posts)[1];
      console.log("obj");
      console.log(obj);
      this.posts=obj;
      
      }) 
    
    // else{
    //   console.log("this is mobile");
    //  this.apiService.getpostsMobile().then(data =>{
    // console.log(data);
        
    //      var obj=Object.values(this.posts)[1];
    //   console.log("obj");
    //   console.log(obj);
    //   this.posts=obj;
      
    //   })
    // }
    });
  }

 

}
