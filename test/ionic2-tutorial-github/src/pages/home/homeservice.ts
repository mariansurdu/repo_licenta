import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class HomeService {
 private newposturl: string =  'http://localhost:3000/posts';
  private getposturl="http://localhost:3000/postss";
  constructor (private http: Http) {}

  /*login(email: String,password:String): any {
    console.log(email);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.resourceUrl,{email:email,password:password},{headers:headers});
  }*/

  getposts():any {
    return this.http.get(this.getposturl).map((res)=>{
      return res.json();
    })
  }

  post(data:any): any {
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.newposturl,data,{headers:headers});
  }

}
