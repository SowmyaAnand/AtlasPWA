import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { ApiwebService } from './../../apiweb.service';
import { ApiService } from './../../api.service';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.page.html',
  styleUrls: ['./addpost.page.scss'],
})
export class AddpostPage implements OnInit {
description:string;
title:string;
Selected_filename:string;
category:string;
file: File;
  constructor(private router: ActivatedRoute,public platform: Platform,private fileChooser: FileChooser,private filePicker: IOSFilePicker,private apiService: ApiService, private apiwebservice:ApiwebService) { }


  ngOnInit() {
    this.category=this.router.snapshot.paramMap.get("category_no");
    console.log(this.category);
  }

  
 changeListener($event) : void {
    this.file = $event.target.files[0];
    console.log("the file ")
    console.log(this.file);
  }
  postclick()
  {
    console.log("enter post clicked");
    console.log(this.category);
    console.log(this.title);
    console.log(this.description);
    console.log(this.file);
    this.apiwebservice.addpost(this.category,this.title,this.description,this.file);
//      if(this.platform.is('desktop'))
//     {
//       console.log("desktop")
//       this.apiwebservice.addpost(this.category,this.title,this.description,this.file);

//     }
// else 
//     {
//       console.log("ios")
//       this.apiService.AddPostMobile(this.category,this.title,this.description,this.file);
//     }
   
   
   

  }
  
  
  addattachment()
  {
    console.log("clicked attach")
   this.platform.is('ios')
   {
    this.filePicker.pickFile()
    .then(uri => this.file=new File([""],uri))
    .catch(err => console.log('Error', err));
   }
   this.platform.is('android')
   {
    this.fileChooser.open()
    .then(uri => this.file=new File([""],uri))
    .catch(e => console.log(e));
   }
 
  }
}
