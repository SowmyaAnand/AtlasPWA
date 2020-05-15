import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public LoginUsername: string;
  public category_selected:string;
  public title_displayed:string;
  public type:string;
  public messagecount:number;
  //saving totalcounts from sql
  public totaltrendingcount:number;
  public totalinnovationcount:number;
  public totalitcount:number;
  public totalpeoplecount:number;
  public totaltrainingcount:number;
  public totalcurrentcount:number;
  public totalaccoladescount:number;
//geting saved posts list from sql
  public trendingcount:string;
  public innovationcount:string;
  public itcount:string;
  public peoplecount:string;
  public trainingcount:string;
  public currentcount:string;
  public accoladescount:string;
  public globalreadposts:any;

  //getting count of saved posts from sql
  public Initialtrendingcount:Array<string>;
  public Initialinnovationcount:Array<string>;
  public Initialitcount:Array<string>;
  public Initialpeoplecount:Array<string>;
  public Initialtrainingcount:Array<string>;
  public Initialcurrentcount:Array<string>;
  public Initialaccoladescount:Array<string>;
  public notificationcount:number;
  constructor() { }
  
}
