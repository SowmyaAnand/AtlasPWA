import { GlobalService } from './global.service';
import { LoginApi, AddpostApi, AddApprovedPostApi, InboxPostApi, AddApprovedPostApiList, DeletePostApi, AddlikeApi, FilterPostsApi, CommentsListApi, CommentsCountApi, likecountApi, AddcommentApi, BaseurlMobile } from './pages/ApiConstants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 mob_url:string;
  constructor(private httpClient: HttpClient,private http: HTTP,private global: GlobalService,public alertController: AlertController,public navCtrl: NavController) { }


  async presentAlert(headertext:string,messagetext:string) {
    const alert = await this.alertController.create({
      header:   headertext,
      message: messagetext,
      buttons: ['OK']
    });

    await alert.present();
  }



 public validateloginMobile(user:string,pswd:string)
{ this.mob_url=BaseurlMobile+LoginApi
let data = {
           "Username":  user,
            "Password":  pswd,
        };
        let headers = {
            'Content-Type': 'application/json'
        };

        this.http.post(this.mob_url, data, headers)
                    .then((data) => {
                        console.log(data['message']);
                        var ob=Object.values(data['data'])[0];
                         console.log(ob);
                          console.log(ob['Username']);
                          console.log(ob['Type']);
                         if(data['message']=="Invalid")
                        {
                          this.presentAlert("Login Failed","Invalid Username/Password");
                        }
                         else
                        {
                          this.global.type=ob['Type'];
                          this.global.LoginUsername=ob['Username']
                          this.navCtrl.navigateRoot('/home')
                        }
                        })
                   .catch((error) => {
                        console.log(error);
                        this.presentAlert(error,error);
                         });
}
public AddPostMobile(category:string,title:string,description:string,attachment:File)
{ this.mob_url=BaseurlMobile+AddpostApi;

        let headers = {
            
           'Content-Type': 'application/json'
        };
        const formData = new FormData();
        formData.append('attachment', attachment);
  formData.append("category",category );
  formData.append("title",title);
  formData.append("description",description);
  formData.append("publishedby",this.global.LoginUsername);
  formData.append("date",formatDate(new Date(),'yyyy/MM/dd','en'));
        this.http.post(this.mob_url, formData, headers)
                    .then((data) => {
                      console.log("POST Request is successful",data['message']);
                      if(data['message']=="success")
                        {
                            this.presentAlert("Success","Post Added Successfully");
                        }
                        })
                   .catch((error) => {
                        console.log(error);
                        this.presentAlert("Error ",error);
                         });
}
public AddApprovedPostMobile(category:string,title:string,description:string,attachment:string,published:string,date:string,postid:number)
{ this.mob_url=BaseurlMobile+AddApprovedPostApi;

        let headers = {
            
            'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
        };
       

        this.http.post(this.mob_url, {
          "category":category,
      "title":title,
      "description":description,
      "attachment":attachment,
      "publishedby":published,
      "date":date,
      "PostId":postid
        }, headers)
                    .then((data) => {
                      console.log("POST Request is successful",data['message']);
                      if(data['message']=="success")
                        {
                            this.presentAlert("Success","Post Added Successfully");
                        }
                        })
                   .catch((error) => {
                        console.log(error);
                        this.presentAlert("Error ",error);
                         });
}
public DeletePostMobile(id:number)
{ this.mob_url=BaseurlMobile+DeletePostApi;

  let data = {
   "PostId":id
 };
 let headers = {
     'Content-Type': 'application/json'
 };

 this.http.delete(this.mob_url, data, headers)
             .then((data) => {
                 console.log(data['message']);
                  if(data['message']=="Failed")
                 {
                   this.presentAlert("Error",data['message']);
                 }
                  else
                 {
                   this.presentAlert("Success","Post Rejected Successfully");
                 }
                 })
            .catch((error) => {
                 console.log(error);
                  });
}
public DeletePostMobileList(id:number)
{ this.mob_url=BaseurlMobile+DeletePostApi;

  let data = {
   "PostId":id
 };
 let headers = {
     'Content-Type': 'application/json'
 };

 this.http.delete(this.mob_url, data, headers)
             .then((data) => {
                 console.log(data['message']);
                  if(data['message']=="Invalid")
                 {
                 }
                  else
                 {
                   
                 }
                 })
            .catch((error) => {
                 console.log(error);
                  });
}
public getpostsMobile()
{
  this.mob_url=BaseurlMobile+InboxPostApi;
return this.http.get(this.mob_url,[],[]);
}
public getpostsApprovedMobile()
{
  this.mob_url=BaseurlMobile+AddApprovedPostApiList;

return this.http.get(this.mob_url,[],[]);
}
//newly Added
public AddlikesMobile(postid:number)
  { 
    let headers = {
      'Content-Type': 'application/json'
                  };
    
    console.log("inside service")
    
    this.mob_url=BaseurlMobile+AddlikeApi;
    
    console.log(this.global.LoginUsername);
    return this.http.post(this.mob_url,
      {
        "postid":  postid,
        "username":this.global.LoginUsername,
      },headers)
    
           
    }

    public getFilterpostsMobile(fdate:string,tdate:string)
    {
      let headers = {
        'Content-Type': 'application/json'
    };
      this.mob_url=BaseurlMobile+FilterPostsApi;
    return this.http.post(this.mob_url,{
      "fromdate":fdate,
      "todate":tdate
    },headers);
    }
    
    public getcommentsListMobile(postiid:number)
    {
      let headers = {
        'Content-Type': 'application/json'
    };
      this.mob_url=BaseurlMobile+CommentsListApi;
    return this.http.post(this.mob_url,
      {
        "postid":postiid
      },headers);
    }
    
    public getcommentscountMobile(postidd:number)
    {
      this.mob_url=BaseurlMobile+CommentsCountApi;
      let headers = {
        'Content-Type': 'application/json'
                   };
        console.log(this.global.LoginUsername);
        return this.http.post(this.mob_url,
          {
            "postid":  postidd,
            
          },headers)

    }
    public getlikescountMobile(postidd:number)
    {
      this.mob_url=BaseurlMobile+likecountApi;
      let headers = {
        'Content-Type': 'application/json'
    };
       console.log("get likes count");
        
        console.log(this.global.LoginUsername);
        return this.http.post(this.mob_url,
          {
            "postid":  postidd,
            
          },headers)
    
    
    }
    public addcommentMobile(comment:string,postid:number)
    {
      
      this.mob_url=BaseurlMobile+AddcommentApi;
      let headers = {
        'Content-Type': 'application/json'
    };
      return  this.http.post(this.mob_url,{
          "comment":comment,
          "username":this.global.LoginUsername,
          "postid":postid,
          
        },headers
       )
      }
}
