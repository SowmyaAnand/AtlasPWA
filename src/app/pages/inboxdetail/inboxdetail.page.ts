import { DescriptionPage } from './../description/description.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';
import { Platform, IonLabel } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-inboxdetail',
  templateUrl: './inboxdetail.page.html',
  styleUrls: ['./inboxdetail.page.scss'],
})
export class InboxdetailPage implements OnInit {
  @ViewChild('myTitle',{static:false}) myTitle:ElementRef;
  description:string;
  title:string;
  category:string;
  attachment:string
  PostId:number;
  Publishedby:string;
  date:string;
  ddate:string;
  updated:number=0;
  constructor(private routerinbox: ActivatedRoute,public platform: Platform,private apiService: ApiService, private apiwebservice:ApiwebService) {
   }
  
  ngOnInit() {
    console.log("categoryS")
    this.routerinbox.queryParams.subscribe(params => {
      this.category = params["category"];
      this.title = params["title"];
      this.description=params["description"];
      this.attachment=params["attachment"];
      this.PostId=params["postid"];
      this.Publishedby=params["publishedby"];
      this.date=params["date"];
      this.ddate=params["displaydte"];
  });
    
    
console.log("in inbox top");
    console.log(this.PostId);
    console.log(this.title);
  }
Accept()
{
this.updated=1;
  // this.platform.is('ios')
  // {
  //   this.apiService.AddApprovedPostMobile(this.category,this.title,this.description,this.attachment,this.Publishedby,this.date,this.PostId);
  // }
  // this.platform.is('android')
  // {
  //   this.apiService.AddApprovedPostMobile(this.category,this.title,this.description,this.attachment,this.Publishedby,this.date,this.PostId);
  // }
  
    this.apiwebservice.approvepost(this.category,this.title,this.description,this.attachment,this.Publishedby,this.date,this.PostId);

  
}
Reject()
{

  // this.platform.is('ios')
  // {
  //   this.apiService.DeletePostMobile(this.PostId);
  // } 
  // this.platform.is('android')
  // {
  //   this.apiService.DeletePostMobile(this.PostId);
  // }
 
    console.log("in inbox ")
    console.log(this.PostId);
    this.apiwebservice.deletepost(this.PostId);

  
}
getExtension(attach:string)
{
  var selected_file=attach;
    
  
  var lastDot = selected_file.lastIndexOf('.');

var fileName = attach.substring(0, lastDot);
var ext = attach.substring(lastDot + 1);
return ext;
}
ionViewWillLeave(){
console.log("will leave");
if(this.updated==1)
{
  // this.platform.is('ios')
  // {
  //   this.apiService.DeletePostMobileList(this.PostId);
  // } 
  // this.platform.is('android')
  // {
  //   this.apiService.DeletePostMobileList(this.PostId);
  // }
  
    console.log("in inbox ")
    console.log(this.PostId);
    this.apiwebservice.deletepostList(this.PostId);

  
}
}

}
