import { Component,OnInit } from '@angular/core';

import Keycloak from 'keycloak-js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  token = 'Token Indisponivel!';



ngOnInit() {
let initOptions = {
//url: 'https://login.sandbox.stone.com.br/auth', realm: 'stone-credit',  clientId:'cyber-financial'
url: 'http://localhost:8080/auth', realm: 'Teste',  clientId:'cyber'
}
let keycloak = Keycloak(initOptions);
keycloak.init({ onLoad: "login-required" }).success((auth) => {
   if (!auth) {
      window.location.reload();
   } else {
     console.log("Authenticated");
   }
;   
   localStorage.setItem("token", keycloak.token);
   localStorage.setItem("refresh-token", keycloak.refreshToken);
   this.token = ''+keycloak.token;
   setTimeout(() => {
      keycloak.updateToken(60).success((refreshed) => {
        if(refreshed) {
          console.debug('Token refreshed' + refreshed);
        }else{
        }
      }).error(() => {
         console.error('Failed to refresh token');
      });
   }, 40000)
}).error(() => {
   console.error("Authenticated Failed");
});
}

}