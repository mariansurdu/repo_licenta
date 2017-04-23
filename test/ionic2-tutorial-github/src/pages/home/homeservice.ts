import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class HomeService {
 private newposturl: string =  'http://localhost:3000/newpost';
  private getposturl="http://localhost:3000/companynews/";
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

}
