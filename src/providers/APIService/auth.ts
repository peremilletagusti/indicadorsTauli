import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { WrapperProvider } from "./wrapper";
import { Observable } from "rxjs/observable";
import { Storage } from '@ionic/storage';

/*
  Generated class for the WrapperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider extends WrapperProvider {
  
  constructor(public http: Http,
              public storage: Storage) {
                super(http);
  }

  login(credentials) : Observable<any> {
    return this.http.get(this.parseUrl + "login?username=" + credentials.usuari + 
                                                      "&password=" + credentials.password,
                                                    {headers: this.headers})
                    .map(res => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || "Server error"));
  }

  register(credentials) : Observable<any> {
    return this.http.post(this.parseUrl + "users",
                  JSON.stringify(credentials), {headers: this.headers})
                                                    .map(res => res.json())
                                                    .catch((error:any) => Observable.throw(error.json().error || "Server error"));
  }

  checkTokenValid(token):Observable<any> {
    debugger
    return this.http.get(this.parseUrl + "users/me", {headers: this.buildTokenHeaders(token)})
                    .map(res => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || "Server error"));

  }

  checkToken() {
    return new Promise((resolve) => {

      this.storage.get("infoLogin").then(
        res => {   
          if (res){
            this.checkTokenValid(res.sessionToken).subscribe(res =>{
              resolve(true);
            }, 
            error =>{
              resolve(false);
            });
          } else {
            resolve(false);
          }  
        }, 
        error => {
         resolve(false); 
        }
      );
    });
  

   }

  
}

