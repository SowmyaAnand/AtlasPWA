import { TabspagePage } from './../tabspage/tabspage.page';
import { post } from './../tabspage/post.model';
import { ActivatedRoute } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ApiwebService } from './../../apiweb.service';
import { GlobalService } from './../../global.service';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
@ViewChild('myTabs',{static:false}) tabs:IonTabs;
title:string="Trending";
frst:Array<string>;
selected_tab:string="Trending";
tab1Params: any;
msgcount:number;
loginusertype:string;
homeposts:any;
trendingunreadcount:number;
innovationunreadcount:number;
itunreadcount:number;
peopleunreadcount:number;
trainingunreadcount:number;
currentunreadcount:number;
accoladesunreadcount:number;
textnotification:string;
  constructor(public navCtrl: NavController,public localnotification:LocalNotifications,private routerinbox: ActivatedRoute,public global:GlobalService, public tb:TabspagePage,public apiwebservice:ApiwebService,public actionSheetController: ActionSheetController,public modalController: ModalController) 
  { 
    console.log("entered ngonit home ")
    console.log("entered ngonit home ")
  }
 
  ngOnInit() 
  {
    
    
   console.log("HOME  >>> ngonit");
    console.log(this.accoladesunreadcount);
    console.log("entered ngonit home ")
    
   
    this.apiwebservice.msgscount().subscribe((data:any[])=>
    
        {
          
           console.log(data);
            var ob=Object.values(data['data'])[0];
           console.log(ob);
            console.log(ob["count"])
            this.msgcount=ob["count"];
            console.log("message");
            console.log(this.msgcount);
        }) 
  
      
 
        this.countsunread();
       
      this.global.category_selected="Trending";
      // this.msgcount=this.global.messagecount;
       console.log(this.global.category_selected);
        this.global.title_displayed="Trending";
      this.loginusertype=this.global.type;
      console.log(this.loginusertype);
    
    

     }
  ionViewDidEnter()
   {
    console.log("HOME  >>> ionviewdidenter");
    this.apiwebservice.msgscount().subscribe((data:any[])=>{
      
      console.log(data);
      var ob=Object.values(data['data'])[0];
      console.log(ob);
       console.log(ob["count"])
       this.msgcount=ob["count"];
      console.log("message");
       console.log(this.msgcount);
       }) 

       this.tb.posts="";

   console.log("homepage did enter ionViewWillEnter");
 
    this.global.category_selected="Trending";
   console.log(this.global.category_selected);
   
    
      
   }

onTabsChange()
{
  console.log("HOME  >>> ontabschange");
  this.countsunread();
  console.log("entered tab change home***");
  let selected_tab = this.tabs.getSelected();
  this.title=this.tabs.getSelected();
  console.log(this.tabs.getSelected())
  console.log("entered trending count in readpost",this.global.category_selected);
    console.log("entered trending count in readpost",this.global.trendingcount);
    
}
tbchange()
{

  console.log("HOME  >>> tbchange");
  this.global.title_displayed=this.tabs.getSelected();
  console.log("entered tab will change home");
  console.log(this.title);
  let tb = this.tabs.getSelected();
   this.global.category_selected=this.tabs.getSelected();
this.validateunreadcountshome();
this.countsunread();
  console.log(tb);
}

messagelist()
{
  this.navCtrl.navigateForward('/messagelist')
}
filter()
{
  this.navCtrl.navigateForward('/filter')
}

countsunread()
{
  console.log("HOME  >>> countunread");
  
  this.apiwebservice.categorycount().subscribe((data:any[])=>
  {
    console.log("category count")
    console.log(data);
var ob=Object.values(data['data'])[0];
 var ob1=Object.values(data['data'])[1];
  var ob2=Object.values(data['data'])[2];
   var ob3=Object.values(data['data'])[3];
    var ob4=Object.values(data['data'])[4];
     var ob5=Object.values(data['data'])[5];
      var ob6=Object.values(data['data'])[6];
console.log(ob);
console.log(ob["category"]);
this.global.totalaccoladescount=ob["count"]
      
        this.global.totalcurrentcount=ob1["count"]
      
        this.global.totalinnovationcount=ob2["count"]
      
        this.global.totalitcount=ob3["count"]
      
        this.global.totalpeoplecount=ob4["count"]
     
        this.global.totaltrainingcount=ob5["count"]
      
        this.global.totaltrendingcount=ob6["count"]
        
     
        console.log("the values retrieved from table",this.global.Initialtrendingcount);

        if(this.global.trendingcount=="")
        {
          console.log("empty***",this.global.trendingcount);
          this.trendingunreadcount=this.global.totaltrendingcount-0;
        }
        else
        {
          console.log(" not empty***",this.global.trendingcount)
          this.trendingunreadcount=this.global.totaltrendingcount-this.global.Initialtrendingcount.length+1;
        }


        if(this.global.innovationcount=="")
        {
          this.innovationunreadcount=this.global.totalinnovationcount-0;
        }
        else
        {
          this.innovationunreadcount=this.global.totalinnovationcount-this.global.Initialinnovationcount.length+1;
        }


        if(this.global.itcount=="")
        {
          this.itunreadcount=this.global.totalitcount-0;
        }
        else
        {
          this.itunreadcount=this.global.totalitcount-this.global.Initialitcount.length+1;
        }


        if(this.global.peoplecount=="")
        {
          this.peopleunreadcount=this.global.totalpeoplecount-0;
        }
        else
        {
          this.peopleunreadcount=this.global.totalpeoplecount-this.global.Initialpeoplecount.length+1;
        }

        if(this.global.trainingcount=="")
        {
          this.trainingunreadcount=this.global.totaltrainingcount-0;
        }
        else
        {
          this.trainingunreadcount=this.global.totaltrainingcount-this.global.Initialtrainingcount.length+1;
        }


        if(this.global.currentcount=="")
        {
          this.currentunreadcount=this.global.totalcurrentcount-0;
        }
        else
        {
          this.currentunreadcount=this.global.totalcurrentcount-this.global.Initialcurrentcount.length+1;
        }


        if(this.global.accoladescount=="")
        {
          this.accoladesunreadcount=this.global.totalaccoladescount-0;
        }
        else
        {
          this.accoladesunreadcount=this.global.totalaccoladescount-this.global.Initialaccoladescount.length+1;
        }
        this.global.notificationcount= this.trendingunreadcount+ this.innovationunreadcount+ this.itunreadcount +this.peopleunreadcount+this.trainingunreadcount+this.currentunreadcount+this.accoladesunreadcount;
        this.textnotification = `You have ${this.global.notificationcount} unread posts`
    console.log("notification==",this.textnotification);
         this.localnotification.schedule({
  id: 1,
  text: this.textnotification,
  //data: { secret: 'secret' },
  led:'FF0000',
  smallIcon:"res://mipmap-ldpi/ic_launcher.png",
  foreground:true
  });
       
      
  })        


}


  async handleButtonClick() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select category for  new post',
      buttons: [{
        text: 'Trending',
        role: 'destructive',
        icon: 'flame',
        handler: () => {
          this.navCtrl.navigateForward(['addpost',{category_no:"Trending"}])
        }
      }, {
        text: 'Innovation',
        icon: 'bulb',
        handler: () => {
          this.navCtrl.navigateForward(['addpost',{category_no:"Innovation"}])
          console.log('Share clicked');
        }
      }, {
        text: 'IT',
        icon: 'laptop-outline',
        handler: () => {
          this.navCtrl.navigateForward(['addpost',{category_no:"ITKey"}])
          console.log('Play clicked');
        }
      }, {
        text: 'CurrentAffairs',
        icon: 'newspaper-outline',
        handler: () => {
          this.navCtrl.navigateForward(['addpost',{category_no:"CurrentAffairs"}])
          console.log('Favorite clicked');
        }
      }, 
      
      {
        text: 'People',
        icon:'person',
        handler:()=>{
          this.navCtrl.navigateForward(['addpost',{category_no:"People"}])
          console.log('clicked');
        }
      },
      
      {
        text: 'Training',
        icon:'book',
        handler:()=>{
          this.navCtrl.navigateForward(['addpost',{category_no:"Training"}])
          console.log('clicked');
        }
      },
      {
        text: 'Accolades',
        icon:'trophy',
        handler:()=>{
          this.navCtrl.navigateForward(['addpost',{category_no:"Accolades"}])
          console.log('clicked');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


 
    // async categorieslist() {
    //   const modal = await this.modalController.create({
    //     component: AlertcategorylistPage,
    //     componentProps: {
    //       'firstName': 'Douglas',
    //       'lastName': 'Adams',
    //       'middleInitial': 'N'
    //     }
    //   });
    //   return await modal.present();
    // }
  

validateunreadcountshome()
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
     
    
      this.countsunread();
          
          
  
      },
      error  => {
            console.log("Error", error);
              });
  }
}

