import { GlobalService } from './../../global.service';
import { AddApprovedPostApiList, PostsDesc } from './../ApiConstants';
import { Component, OnInit, ViewChild } from '@angular/core';
import {post} from './post.model'
import { IonContent } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Platform, IonLabel } from '@ionic/angular';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabspage',
  templateUrl: './tabspage.page.html',
  styleUrls: ['./tabspage.page.scss'],
})
export class TabspagePage implements OnInit {
  lock:string="lock-closed-outline";
  read:string="false";
  unreadcount:number=0;
 ioncardshow:number=1;
 spinnercolor:string;
nam: string;
frst:Array<string>;
readpostnumbers:any;
readposts:string;
pid:string;
totalreadpoststobepassed:string="0";
  @ViewChild(IonContent,{static:false}) content:IonContent;
 
  constructor(private routerinbox: ActivatedRoute,public navCtrl: NavController,private router: Router,public global:GlobalService,public platform: Platform,private apiService: ApiService, private apiwebservice:ApiwebService) { 
   
  }
  posts:any;

  ngOnInit() {
    console.log("TABSPAGE  >>> ngoninit");
     console.log("tabspage did enter ngonit **");
     this.spinnercolor="red";
    console.log('trending count in tabs page',this.global.trendingcount);
   this.readpostslist();
  //this.validateunreadcounts();
  }
 
  readpostslist()
  {
    console.log("entered trending count in readpost",this.global.category_selected);
    console.log("entered trending count in readpost",this.global.itcount);
    if(this.global.category_selected=="Trending")
    {
      
  this.frst=this.global.trendingcount.split('-');
    }
    else if(this.global.category_selected=="Innovation")
    {
       this.frst=this.global.innovationcount.split('-');
    }
    else if(this.global.category_selected=="ITKey")
    {
  this.frst=this.global.itcount.split('-');
    }
    else if(this.global.category_selected=="CurrentAffairs")
    {
       this.frst=this.global.currentcount.split('-');
    }
     else if(this.global.category_selected=="People")
    {
       this.frst=this.global.peoplecount.split('-');
    }
     else if(this.global.category_selected=="Training")
    {
       this.frst=this.global.trainingcount.split('-');
    }
     else if(this.global.category_selected=="Accolades")
    {
       this.frst=this.global.accoladescount.split('-');
    }
    
     console.log('frst value',this.frst);
    
     this.global.globalreadposts=this.frst.map(Number);
     console.log('this.global.globalreadposts elements are',this.global.globalreadposts);
  }


  
 ionViewWillEnter()
 {
  console.log("TABSPAGE  >>> ionviewwillenter");
  //this.validateunreadcounts();
   this.posts="";
   
   console.log("tabspage did enter ionViewWillEnter");
   console.log('this.router.url', this.router.url); 
   var ul=this.router.url;
   var ct= ul.split('/');
   console.log('category is ...',ct[2]);
    this.global.category_selected=ct[2];
   console.log(this.global.category_selected);
   
     this.apiwebservice.getApprovedposts(this.global.category_selected).subscribe((data:any[])=>{
        
        this.posts=data;
      var obj=Object.values(this.posts)[1];
      console.log("output in tabs");
      console.log(obj);
      this.posts=obj;
     var postelement= this.posts[0];
      this.pid = postelement['PostId'];
      this.pid=this.frst[0]

    this.readpostnumbers= this.global.globalreadposts;
         console.log("total values=",this.global.globalreadposts);

    console.log('readpost numbers=',this.global.globalreadposts);
     console.log('second=',this.readpostnumbers);
 console.log("comapred true",this.readpostnumbers.indexOf(postelement['PostId']));
  

   if(this.frst.indexOf(this.pid))
   {
     console.log("correct");

   }
   else
{
  console.log("incorrect");

}
    
     

       
      }) 
   
  }
 
  getExtension(post)
  {
    var selected_file=post.attachment;
      
    
    var lastDot = selected_file.lastIndexOf('.');

    var fileName = post.attachment.substring(0, lastDot);
     var ext = post.attachment.substring(lastDot + 1);
    return ext;
  }


  cardclick(catt:string,tttle:string,desc:string,attachm:string,postidd:number,publishedbyy:string,datee:string,post)
  {

   
    
    this.read="true";
    
    var dt = datee.split('T');
    console.log(dt[0]);
    console.log("data passed");
    let navigationExtrasDescription: NavigationExtras = {
      queryParams: {
          category: catt,
          title: tttle,
          description:desc,
          attachment:attachm,
         postid:postidd,
        publishedby:publishedbyy,
        date:dt[0]
      }
      }
    if(this.global.globalreadposts.indexOf(postidd)==-1)
    {
 this.global.globalreadposts.push(postidd);
 this.global.notificationcount += 1;
    }
  this.readpostnumbers=this.global.globalreadposts;
    console.log("readpostssss after push",this.global.globalreadposts);
      
    this.totalreadpoststobepassed="0";
   for(let i=1;i<this.global.globalreadposts.length;i++)
   {
   
  this.totalreadpoststobepassed += "-"+this.global.globalreadposts[i];

   }


   console.log("totol read posts to be passed",this.totalreadpoststobepassed);



    if(this.global.category_selected=="Trending")
   {
     this.apiwebservice.addtrending(this.totalreadpoststobepassed).subscribe((data)=>{
      //this.global.trendingcount = this.totalreadpoststobepassed;
      console.log("the new values arew",this.global.trendingcount);
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
   else if(this.global.category_selected=="Innovation")
   {
     this.apiwebservice.addinnovation(this.totalreadpoststobepassed).subscribe((data)=>{
     // this.global.innovationcount = this.totalreadpoststobepassed;
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
   else if(this.global.category_selected=="ITKey")
   {
     this.apiwebservice.addit(this.totalreadpoststobepassed).subscribe((data)=>{
      //this.global.itcount = this.totalreadpoststobepassed;
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
   else if(this.global.category_selected=="CURRENTAFFAIRS")
   {
     this.apiwebservice.addcurrent(this.totalreadpoststobepassed).subscribe((data)=>{
     // this.global.currentcount = this.totalreadpoststobepassed;
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
    else if(this.global.category_selected=="People")
   {
     this.apiwebservice.addpeople(this.totalreadpoststobepassed).subscribe((data)=>{
     // this.global.trendingcount = this.totalreadpoststobepassed;
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
    else if(this.global.category_selected=="Training")
   {
     this.apiwebservice.addtraining(this.totalreadpoststobepassed).subscribe((data)=>{
     // this.global.trainingcount = this.totalreadpoststobepassed;
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
    else if(this.global.category_selected=="Accolades")
   {
     this.apiwebservice.addaccolades(this.totalreadpoststobepassed).subscribe((data)=>{
     // this.global.accoladescount = this.totalreadpoststobepassed;
      this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    }) 
   }
   
  
   
 
   

  }
  listclick(catt:string,tttle:string,desc:string,attachm:string,postidd:number,publishedbyy:string,datee:string,post)
  {
    this.read="true";
   console.log("total values=",this.global.globalreadposts);
    post.color="green"
    console.log(datee);
    var dt = datee.split('T');
    console.log(postidd);
    console.log("data passed");
    
    let navigationExtrasDescription: NavigationExtras = {
      queryParams: {
          category: catt,
          title: tttle,
          description:desc,
          attachment:attachm,
         postid:postidd,
        publishedby:publishedbyy,
        date:dt[0]
      }
      }
   this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
    
         if(this.global.globalreadposts.indexOf(postidd)==-1)
    {
 this.global.globalreadposts.push(postidd);
 this.global.notificationcount += 1;
    }
    this.readpostnumbers=this.global.globalreadposts;

    console.log("readpostssss after push",this.global.globalreadposts);
      
    this.totalreadpoststobepassed="0";
    for(let i=1;i<this.global.globalreadposts.length;i++)
    {
    
   this.totalreadpoststobepassed += "-"+this.global.globalreadposts[i];
 
    }
    console.log("tototl value to  be passed",this.totalreadpoststobepassed);




    if(this.global.category_selected=="Trending")
    {
      this.apiwebservice.addtrending(this.totalreadpoststobepassed).subscribe((data)=>{
      // this.global.trendingcount = this.totalreadpoststobepassed;
       console.log("the new values arew",this.global.trendingcount);
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }
    else if(this.global.category_selected=="Innovation")
    {
      this.apiwebservice.addinnovation(this.totalreadpoststobepassed).subscribe((data)=>{
      // this.global.innovationcount = this.totalreadpoststobepassed;
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }
    else if(this.global.category_selected=="ITKey")
    {
      this.apiwebservice.addit(this.totalreadpoststobepassed).subscribe((data)=>{
     //  this.global.itcount = this.totalreadpoststobepassed;
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }
    else if(this.global.category_selected=="CURRENTAFFAIRS")
    {
      this.apiwebservice.addcurrent(this.totalreadpoststobepassed).subscribe((data)=>{
    //   this.global.currentcount = this.totalreadpoststobepassed;
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }
     else if(this.global.category_selected=="People")
    {
      this.apiwebservice.addpeople(this.totalreadpoststobepassed).subscribe((data)=>{
     //  this.global.trendingcount = this.totalreadpoststobepassed;
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }
     else if(this.global.category_selected=="Training")
    {
      this.apiwebservice.addtraining(this.totalreadpoststobepassed).subscribe((data)=>{
     //  this.global.trainingcount = this.totalreadpoststobepassed;
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }
     else if(this.global.category_selected=="Accolades")
    {
      this.apiwebservice.addaccolades(this.totalreadpoststobepassed).subscribe((data)=>{
      // this.global.accoladescount = this.totalreadpoststobepassed;
       this.navCtrl.navigateForward(['description'],navigationExtrasDescription);
     }) 
    }


  
   
  }



  validateunreadcounts()
  {
    this.apiwebservice.validatereadcount(this.global.LoginUsername).subscribe(
      data  =>      {
      console.log("POST Request is successful",data['data']);
      var ob=Object.values(data['data'])[0];
      console.log(ob);
      console.log(ob['Username']);
      
      
     
         
          this.global.LoginUsername=ob['Username'];
          this.global.type=ob['Type'];
          console.log('type in login',this.global.type);
      //getting the values from sql
         this.global.trendingcount=ob['Trendingcount'];
         this.global.innovationcount=ob['Innovationcount'];
         this.global.itcount=ob['Itcount'];
         this.global.peoplecount=ob['Peoplecount'];
         this.global.trainingcount=ob['Trainingcount'];
         this.global.currentcount=ob['Currentcount'];
         this.global.accoladescount=ob['Accoladescount'];
      //  saving it as an array
      
      
      
      console.log("not empty");
      this.global.Initialtrendingcount=this.global.trendingcount.split('-');
      this.global.Initialinnovationcount=this.global.innovationcount.split('-');
      this.global.Initialitcount= this.global.itcount.split('-');
      this.global.Initialpeoplecount=this.global.peoplecount.split('-');
      this.global.Initialtrainingcount=this.global.trainingcount.split('-');
      this.global.Initialcurrentcount=this.global.currentcount.split('-');
      this.global.Initialaccoladescount=this.global.accoladescount.split('-');
      console.log('count in trending*****=',this.global.Initialtrendingcount.length);
      if(this.global.category_selected=="Trending")
      {
        
    this.frst=this.global.trendingcount.split('-');
      }
      else if(this.global.category_selected=="Innovation")
      {
         this.frst=this.global.innovationcount.split('-');
      }
      else if(this.global.category_selected=="ITKey")
      {
    this.frst=this.global.itcount.split('-');
      }
      else if(this.global.category_selected=="CURRENTAFFAIRS")
      {
         this.frst=this.global.currentcount.split('-');
      }
       else if(this.global.category_selected=="People")
      {
         this.frst=this.global.peoplecount.split('-');
      }
       else if(this.global.category_selected=="Training")
      {
         this.frst=this.global.trainingcount.split('-');
      }
       else if(this.global.category_selected=="Accolades")
      {
         this.frst=this.global.accoladescount.split('-');
      }
      
       console.log('frst value',this.frst);
      
       this.global.globalreadposts=this.frst.map(Number);
       console.log('this.global.globalreadposts elements are',this.global.globalreadposts);
     
    
      
          
          
  
      },
      error  => {
            console.log("Error", error);
              });
  }
 
}
