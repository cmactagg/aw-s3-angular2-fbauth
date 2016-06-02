import {Component} from 'angular2/core';
import {SThreeComponent} from "./upload/sthree.component";


@Component({
    selector: 'my-app',
    directives: [SThreeComponent],
    template: `
    <h1>AWS S3 Angular FBAuth</h1>
    
    <sthree></sthree>
    `
})

export class AppComponent {

}