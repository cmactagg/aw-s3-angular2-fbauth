import {Component} from 'angular2/core';
import {SimpleUploadFBComponent} from "./upload/simple-upload-fb.component";


@Component({
    selector: 'my-app',
    directives: [SimpleUploadFBComponent],
    template: `
    <h1>AWS S3 Angular2 Upload</h1>
    <a href="/auth/facebook">Login with Facebook</a>
    <a href="/logout">Logout</a>
    <a href="/api/user_data">UserData</a>
    <simple-upload-fb></simple-upload-fb>
    `
})

export class AppComponent {

}