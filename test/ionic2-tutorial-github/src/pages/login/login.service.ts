import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class LoginService {
  private resourceUrl: string =  'http://localhost:3000/login';
  constructor (private http: Http) {}

  login(email: String,password:String): any {
    console.log(email);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.resourceUrl,{email:email,password:password},{headers:headers});
  }

}
