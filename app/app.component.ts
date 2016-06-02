import {Component} from 'angular2/core';
import {SThreeComponent} from "./upload/sthree.component";
import {UploadComponent} from "./upload/upload.component";


@Component({
    selector: 'my-app',
    directives: [UploadComponent, SThreeComponent],
    template: `
    <h1>Angular2 is awesome</h1>
    <!--<></uploader>-->
    <sthree></sthree>
    `
})

export class AppComponent {

}