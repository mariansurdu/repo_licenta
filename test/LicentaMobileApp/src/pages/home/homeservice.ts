import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class HomeService {
 private newposturl: string =  'https://licenta112.herokuapp.com/newpost';
  private getposturl="https://licenta112.herokuapp.com/companynews/";
  private testUrl="https://licenta112.herokuapp.com/test";
  constructor (private http: Http) {}

  /*login(email: String,password:String): any {
    console.log(email);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.resourceUrl,{email:email,password:password},{headers:headers});
  }*/

  getposts(cui:any):any {
    return this.http.get(this.getposturl+cui).map((res)=>{
      return res.json();
    })
  }

  post(data:any): any {
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.newposturl,data,{headers:headers});
  }

  sendToServer(data:any) {
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.testUrl,data,{headers:headers});
  }

}
