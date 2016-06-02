// declare module 'aws-sdk' {
//    var foo:any;
//    export = foo;
// }
// declare module 'aws-sdk' {
//    var foo:any;
//    export = foo;
// }

declare const AWS: any;

import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
//import * as AWS from 'aws-sdk';
//import * as FB from 'FB';



@Component({
    selector: 'sthree',
    templateUrl: 'app/upload/sthree.component.html',
    providers: [HTTP_PROVIDERS]
})

export class SThreeComponent implements OnInit{
    policy: String;
    s3signature: String;
    files: File[];
    uploadedImgUrl:URL;
    uploadResult:String;

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
        AWS.config.credentials = new AWS.WebIdentityCredentials({
          RoleArn: 'arn:aws:iam::144917287062:role/sgn-app-dev-img-upload-fb',
          ProviderId: 'graph.facebook.com',
          WebIdentityToken: response.authResponse.accessToken
        });

        

        console.log('You are now logged in.');
      } else {
        console.log('There was a problem logging you in.');
      }
    });
    
    }
    
    onChange(event) {
    this.files = event.srcElement.files;
    console.log(this.files);
  }
    
    
    handleUploadFileClick(){
      
    console.log(this.files);
    var file = this.files[0];
    if (file) {
       //results.innerHTML = '';
var bucket = new AWS.S3({params: {Bucket: 'sgn-app-dev'}});
      var params = {Key: file.name, ContentType: file.type, Body: file};
      bucket.upload(params, function (err, data) {
        //debugger;
        //results.innerHTML = err ? 'ERROR!' : 'UPLOADED.<img src="' + data.Location + '" alt="Smiley face" height="42" width="42">';
        this.uploadResult = err ? 'ERROR!' : 'UPLOADED';        
        this.uploadedImgUrl = data.Location;
        console.log(err ? 'ERROR!' : 'UPLOADED' + data.Location);
      }.bind(this));
    } else {
      console.log('Nothing to upload.');
      this.uploadResult = 'Nothing to upload.';
    }
  }
      
    

}