declare const AWS: any;

import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'simple-upload-fb',
    templateUrl: 'app/upload/simple-upload-fb.component.html',
    providers: [HTTP_PROVIDERS]
})

export class SimpleUploadFBComponent implements OnInit{
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
      
        AWS.config.credentials = new AWS.WebIdentityCredentials({
          RoleArn: 'arn:aws:iam::144917287062:role/sgn-app-dev-img-upload-fb',
          ProviderId: 'graph.facebook.com',
          WebIdentityToken: response.authResponse.accessToken
        });

        console.log('You are now logged in.');
      } 
      else {
        console.log('There was a problem logging you in.');
      }
    });

  }
  
  //had to do this because the binding to a file input doesnt work quite right since it holds its value in an attribute called files, not value  
  onChange(event) {
    this.files = event.srcElement.files;
    console.log(this.files);
  }

    
  handleUploadFileClick(){

    console.log(this.files);
    var file = this.files[0];
    if (file) {
      //get instact of bucket to upload to
      var bucket = new AWS.S3({params: {Bucket: 'sgn-app-dev'}});
      var params = {Key: file.name, ContentType: file.type, Body: file};
      //upload the file to the bucket
      bucket.upload(params, function (err, data) {
        this.uploadResult = err ? 'ERROR!' : 'UPLOADED';        
        this.uploadedImgUrl = data.Location;
        console.log(err ? 'ERROR!' : 'UPLOADED' + data.Location);
      }.bind(this));
    } 
    else {
      console.log('Nothing to upload.');
      this.uploadResult = 'Nothing to upload.';
    }
  }
      
    

}