import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class LoginService {
  private resourceUrl: string =  'https://licenta112.herokuapp.com/login';
  constructor (private http: Http) {}

  login(email: String,password:String,token:String): any {
    alert(email);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.resourceUrl,{email:email,password:password,token:token},{headers:headers});
  }

}
