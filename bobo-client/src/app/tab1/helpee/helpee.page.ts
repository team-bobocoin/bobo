import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-helpee',
    templateUrl: 'helpee.page.html',
    styleUrls: ['helpee.page.scss']
})
export class HelpeePage implements OnInit {
    name = '';
    description = '';

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((data: any) => {
            this.name = data.name;
            this.description = data.description;
        });
    }
}
