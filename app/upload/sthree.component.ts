// declare module 'aws-sdk' {
//    var foo:any;
//    export = foo;
// }


import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import * as AWS from 'aws-sdk';
//import * as FB from 'FB';


@Component({
    selector: 'sthree',
    templateUrl: 'app/upload/sthree.component.html',
    providers: [HTTP_PROVIDERS]
})

export class SThreeComponent implements OnInit{
    policy: String;
    s3signature: String;
    file: File;

    //Use our uploadService
    constructor(){
      
    }

    
    ngOnInit() {
        
    }
    
    handleLoginClick(){
      console.log("clicked login button");
      FB.login(function (response) {
      if (response.authResponse) { // logged in
        debugger;
        // AWS.config.credentials = new AWS.WebIdentityCredentials({
        //   RoleArn: 'arn:aws:iam::144917287062:role/sgn-app-dev-img-upload-fb',
        //   ProviderId: 'graph.facebook.com',
        //   WebIdentityToken: response.authResponse.accessToken
        // });

        

        console.log('You are now logged in.');
      } else {
        console.log('There was a problem logging you in.');
      }
    });
    
    }

}