import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import '../rxjs/index';

/*
  Generated class for the WrapperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WrapperProvider {
  parseUrl       = "http://localhost:1337/parse/";
  parseAppId     = "app";
  parseMasterKey = "master";
  headers        = new Headers(this.buildHeaders());
  
  constructor(public http: Http) {
    console.log('Hello WrapperProvider Provider');
  }

  private buildHeaders(){
    let headers = new Headers({
      "X-Parse-Application-Id": this.parseAppId,
      "X-Parse-Master-Key": this.parseMasterKey,
      "Content-Type": "application/json",      
    });
    return headers;
  }
  
  public buildTokenHeaders(token : String){
    let headers = new Headers({
      "X-Parse-Application-Id": this.parseAppId,
      "X-Parse-REST-API-Key": this.parseMasterKey,
      "X-Parse-Session-Token": token
    });
    return headers;
  }
}

