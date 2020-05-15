
import { GlobalService } from './../../global.service';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';
import { AlertController } from '@ionic/angular';
import { Platform, IonLabel } from '@ionic/angular';
@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
overflowproperty:string="hidden";
heightproperty:string="";


  constructor(private location: Location,public platform: Platform,public alertController: AlertController,private routerinbox: ActivatedRoute,private apiService: ApiService, private apiwebservice:ApiwebService,public global:GlobalService) { }
  description:string;
  title:string;
  category:string;
  attachment:string
  PostId:number;
  Publishedby:string;
  date:string;
  updated:number=0;
  likescount:number=0
  likes:number=0;
  comments:any;
  commentsno:number=0;
  comnt:string;
  ngOnInit() {

    this.routerinbox.queryParams.subscribe(params => {
      this.category = params["category"];
      this.title = params["title"];
      this.description=params["description"];
      this.attachment=params["attachment"];
      this.PostId=params["postid"];
      this.Publishedby=params["publishedby"];
      this.date=params["date"];
      console.log("this.date");
      console.log(this.date);
  });

  }
back()
{
  this.location.back();
}
getExtension(attach:string)
{
  var selected_file=attach;
    
  
  var lastDot = selected_file.lastIndexOf('.');

var fileName = attach.substring(0, lastDot);
var ext = attach.substring(lastDot + 1);
return ext;
}
addcomment()
{
  
  this.apiwebservice.addcomment(this.comnt,this.PostId).subscribe((data)=>{
    console.log("comments");
    console.log(this.comnt)
    console.log(this.PostId);
  console.log(data);
  console.log(data['data']);
  console.log(data['message'])
    if(data['message']=="success")
    {
this.presentAlert("success","comment added  successfully");
this.commentscount();
this.comnt="";
    }
  
  },
  error  => {
        console.log("Error", error);
       
  
          
            }); 
  
  // else
  // {
  //   this.apiService.addcommentMobile(this.comnt,this.PostId).then((data)=>{
  //     console.log("comments");
  //     console.log(this.comnt)
  //     console.log(this.PostId);
  //   console.log(data);
  //   console.log(data['data']);
  //   console.log(data['message'])
  //     if(data['message']=="success")
  //     {
  // this.presentAlert("success","comment added  successfully");
  // this.commentscount();
  // this.comnt="";
  //     }
    
  //   },
  //   error  => {
  //         console.log("Error", error);
         
    
            
  //             }); 
  // }
}

Addlike()
{
  if(this.likes==0)
  {
  console.log("this.global.LoginUsername");
  console.log(this.global.LoginUsername);
  
  
  this.apiwebservice.Addlikes(this.PostId).subscribe((data)=>{
      console.log("outside");
    console.log(data);
    console.log(data['message']);
    if(data['message']=="success")
      {
        this.likescount=this.likescount+1;
        this.likes=1;
        console.log(this.likescount);
      }
      
    
    },
    error  => {
          console.log("Error", error);
         this.presentAlert("Already Liked","user has already liked the post");
    
            
   }); 

  
  // else
  // {
  //   this.apiService.AddlikesMobile(this.PostId).then((data)=>{
  //     console.log("outside");
  //   console.log(data);
  //   console.log(data['message']);
  //   if(data['message']=="success")
  //     {
  //       this.likescount=this.likescount+1;
  //       this.likes=1;
  //       console.log(this.likescount);
  //     }
      
    
  //   },
  //   error  => {
  //         console.log("Error", error);
  //        this.presentAlert("Already Liked","user has already liked the post");
    
            
  //  }); 
  // }
  }
  else
  {
    this.presentAlert("Already Liked","user has already liked the post");
  }
}
async presentAlert(htitle:string,msg:string) {
  const alert = await this.alertController.create({
    header:   htitle,
    message: msg,
    buttons: ['OK']
  });
  await alert.present();
}


ionViewDidEnter() {
  this.platform.ready().then(() => { 
  console.log("entered ");
  console.log(this.PostId);
  // if(this.platform.is('desktop'))
  // {
    console.log("entered ");
    this.apiwebservice.getlikescount(this.PostId).subscribe((data)=>{
     console.log("get likes count");
  console.log(data);
  var ob=Object.values(data['data'])[0];
  console.log(ob);
  console.log(ob["count(*)"])
    this.likescount=ob["count(*)"];
    this.commentscount();
    }) 
 // }
 // else{
  //   console.log("this is mobile");
  //   this.apiService.getlikescountMobile(this.PostId).then((data)=>{
  //     console.log("get likes count");
  //  console.log(data);
  //  var ob=Object.values(data['data'])[0];
  //  console.log(ob);
  //  console.log(ob["count(*)"])
  //    this.likescount=ob["count(*)"];
  //    this.commentscount();
     //}) 
    
    
 // }
  });
}
commentsList()
{
 
  this.apiwebservice.getcommentsList(this.PostId).subscribe((data:any[])=>
  {
    console.log("the data below commentts");
    console.log(data);
    this.comments=data;
     var obj=Object.values(this.comments)[1];
    console.log(obj);
    this.comments=obj;
    console.log(this.comments);
  })

// else{
//   this.apiService.getcommentsListMobile(this.PostId).then((data)=>
//   {
//     console.log("the data below commentts");
//     console.log(data);
//     this.comments=data;
//      var obj=Object.values(this.comments)[1];
//     console.log(obj);
//     this.comments=obj;
//     console.log(this.comments);
//   })
// }
}
commentscount()
{
  
    this.apiwebservice.getcommentscount(this.PostId).subscribe((data)=>
    {
     
         console.log(data);
          var ob=Object.values(data['data'])[0];
          console.log(ob);
          console.log(ob["count(*)"])
          this.commentsno=ob["count(*)"];
          this.commentsList();
     }) 
 
//  else
//  {
//   this.apiService.getcommentscountMobile(this.PostId).then((data)=>
//   {
   
//        console.log(data);
//         var ob=Object.values(data['data'])[0];
//         console.log(ob);
//         console.log(ob["count(*)"])
//         this.commentsno=ob["count(*)"];
//         this.commentsList();
//    }) 
//  }

  }
  
}
