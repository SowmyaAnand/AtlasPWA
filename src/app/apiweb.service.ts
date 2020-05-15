import { GlobalService } from './global.service';
import { Baseurl, LoginApi, AddpostApi, AddApprovedPostApi, InboxPostApi, AddApprovedPostApiList, DeletePostApi, AddlikeApi, likecountApi, AddcommentApi, CommentsListApi, CommentsCountApi, FilterPostsApi, InnovationApi, ItApi, TrainingApi, PeopleApi, CurrentApi, AccoladesApi, TrendingApi, MessagesCountApi, CategoryCountApi, ReadApi } from './pages/ApiConstants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { stringify } from 'querystring';
import { formatDate } from '@angular/common';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Injectable({
  providedIn: 'root'
})
export class ApiwebService {
url:string;
loginusername:string;
returnvalue:number;
textnotification:string;
  constructor(private httpClient: HttpClient,public localnotification:LocalNotifications,public alertController: AlertController,public navCtrl: NavController,public global:GlobalService,public storage:Storage ) { }
 
  async presentAlert(headertext:string,messagetext:string) {
    const alert = await this.alertController.create({
      header:   headertext,
      message: messagetext,
      buttons: ['OK']
    });
    await alert.present();
  }


  
  public validatelogin(user:string,pswd:string)
  { 

    // this.localnotification.schedule({
    //   id: 1,
    //   text: 'Single Local Notification',
    //   data: { secret: 'secret' },
    //   led:'FF0000',
    //   smallIcon:"res://mipmap-ldpi/ic_launcher.png",
    //   foreground:true
    //   });
    this.url=Baseurl+LoginApi;
    this.httpClient.post(this.url,
      {
        "Username":  user,
        "Password":  pswd,
      })
  .subscribe(
  data  =>      {
  console.log("POST Request is successful",data['data']);
  var ob=Object.values(data['data'])[0];
  console.log(ob);
  console.log(ob['Username']);
  
  console.log("wrong",data['message']);
  if(data['data']=="Invalid")
    {
      console.log("wrong");
        this.presentAlert("Login Failed","Invalid Username/Password");
    }
  else
    {
     
      this.global.LoginUsername=ob['Username'];
      this.global.type=ob['Type'];
      console.log('type in login',this.global.type);
//getting the values from sql
     this.global.trendingcount=ob['Trendingcount'];
     this.global.notificationcount=ob['Totalcount'];
     console.log("notification count=",this.global.notificationcount);
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
 this.textnotification = `You have ${this.global.notificationcount} unread posts`;
//  this.localnotification.schedule({
//   id: 1,
//   text: this.textnotification,
//   data: { secret: 'secret' },
//   led:'FF0000',
//   smallIcon:"res://mipmap-ldpi/ic_launcher.png",
//   foreground:true
//   });
this.navCtrl.navigateRoot('/home');
  

      
      
        
    }
  },
  error  => {
        console.log("Error", error);
this.presentAlert("Error","Login Failed");
          });
}



public validatereadcount(usr:string)
{ 
  this.url=Baseurl+ReadApi;
 return this.httpClient.post(this.url,
    {
      "Username":  usr,
      
    })

}

public Addlikes(postid:number)
  { 
    
    console.log("inside service")
    
    this.url=Baseurl+AddlikeApi;
    
    console.log(this.global.LoginUsername);
    return this.httpClient.post(this.url,
      {
        "postid":  postid,
        "username":this.global.LoginUsername,
      })
    
           
};


public addpost(category:string,title:string,description:string,attachment:File)
{
  this.storage.get('username').then((val) => {
    console.log('username is', val);
    this.loginusername=val;
    console.log(this.loginusername);
  });

  
  let formData: FormData = new FormData();
  formData.append('attachment', attachment);
  formData.append("category",category );
  formData.append("title",title);
  formData.append("description",description);
  formData.append("publishedby",this.global.LoginUsername);
  formData.append("date",formatDate(new Date(),'yyyy/MM/dd','en'));
  this.url=Baseurl+AddpostApi;

    this.httpClient.post(this.url,formData
   )
  .subscribe(
  data  =>      {
 
  if(data['message']=="success")
    {
        this.presentAlert("Success","Post Added Successfully");
    }
  
  },
  error  => {
        console.log("Error", error);
      this.presentAlert("Error ",error);
          });
}
public approvepost(category:string,title:string,description:string,attachment:string,pub:string,date:string,postid:number)
{
  
 
  console.log(date);
  
  this.url=Baseurl+AddApprovedPostApi;

    this.httpClient.post(this.url,{
      "category":category,
      "title":title,
      "description":description,
      "attachment":attachment,
      "publishedby":pub,
      "date":date,
      "PostId":postid
    }
   )
  .subscribe(
  data  =>      {
  console.log("POST Request is successful",data['message']);
  if(data['message']=="success")
    {
        this.presentAlert("Success","Post Added Successfully");
    }
  
  },
  error  => {
        console.log("Error", error);
      this.presentAlert("Success","Post Added Successfully");
          });
}
public deletepost(id:number)
{
  
  this.url=Baseurl+DeletePostApi;
  
 
   
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"PostId":id}
};


return new Promise(resolve => {
  this.httpClient.delete(this.url, httpOptions)       
                 .subscribe(res => {     
                  this.presentAlert("Success","Post has been Rejected");
                 }, err => {               
                  this.presentAlert("Error",err);
                 });
  });

}
public deletepostList(id:number)
{
  this.url=Baseurl+DeletePostApi;
  
 
   
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {"PostId":id}
};


return new Promise(resolve => {
  this.httpClient.delete(this.url, httpOptions)       
                 .subscribe(res => {     
                 }, err => {               
                 });
  });

}
public getposts()
{
  this.url=Baseurl+InboxPostApi;
return this.httpClient.get(this.url);
}

public getApprovedposts(catgry:string)
{
  this.url=Baseurl+AddApprovedPostApiList;
return this.httpClient.post(this.url,{
  "category":catgry
});
}
public getFilterposts(fdate:string,tdate:string)
{
  this.url=Baseurl+FilterPostsApi;
return this.httpClient.post(this.url,{
  "fromdate":fdate,
  "todate":tdate
});
}

public getcommentsList(postiid:number)
{
  this.url=Baseurl+CommentsListApi;
return this.httpClient.post(this.url,
  {
    "postid":postiid
  });
}

public getcommentscount(postidd:number)
{
  this.url=Baseurl+CommentsCountApi;
 
   
    
    console.log(this.global.LoginUsername);
    return this.httpClient.post(this.url,
      {
        "postid":  postidd,
        
      })


}
public getlikescount(postidd:number)
{
  this.url=Baseurl+likecountApi;
 
   console.log("get likes count");
    
    console.log(this.global.LoginUsername);
    return this.httpClient.post(this.url,
      {
        "postid":  postidd,
        
      })


}
public addcomment(comment:string,postid:number)
{
  
  
 
  this.url=Baseurl+AddcommentApi;

  return  this.httpClient.post(this.url,{
      "comment":comment,
      "username":this.global.LoginUsername,
      "postid":postid,
      
    }
   )
  }



  public msgscount()
  {
    this.url=Baseurl+MessagesCountApi;
  
    return this.httpClient.get(this.url);

  }
  public categorycount()
  {
    this.url=Baseurl+CategoryCountApi;
  
    return this.httpClient.get(this.url);

  }
public addtrending(cat:string)
{
  
  
 
  this.url=Baseurl+TrendingApi;

  return  this.httpClient.post(this.url,{
     "categoryname":cat,
     "totalcnt":this.global.notificationcount,
      "Username":this.global.LoginUsername,
      
    }
   )
  }
  public addinnovation(cat:string)
{
  
  
 
  this.url=Baseurl+InnovationApi;

  return  this.httpClient.post(this.url,{
      "categoryname":cat,
      "Username":this.global.LoginUsername,
      
    }
   )
  }
  public addit(cat:string)
{
  
  
 
  this.url=Baseurl+ItApi;

  return  this.httpClient.post(this.url,{
      "categoryname":cat,
      "Username":this.global.LoginUsername,
      
    }
   )
  }
  public addpeople(cat:string)
{
  
  
 
  this.url=Baseurl+PeopleApi;

  return  this.httpClient.post(this.url,{
      "categoryname":cat,
      "Username":this.global.LoginUsername,
      
    }
   )
  }
  public addtraining(cat:string)
{
  
  
 
  this.url=Baseurl+TrainingApi;

  return  this.httpClient.post(this.url,{
    "categoryname":cat,
      "Username":this.global.LoginUsername,
      
    }
   )
  }
  public addcurrent(cat:string)
{
  
  
 
  this.url=Baseurl+CurrentApi;

  return  this.httpClient.post(this.url,{
      "categoryname":cat,
      "Username":this.global.LoginUsername,
      
    }
   )
  }
  public addaccolades(cat:string)
{
  
  
 
  this.url=Baseurl+AccoladesApi;

  return  this.httpClient.post(this.url,{
      "categoryname":cat,
      "Username":this.global.LoginUsername,
      
      
    }
   )
  }
}