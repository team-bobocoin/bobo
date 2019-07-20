import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'sponsorhelpee.page.html',
    styleUrls: ['sponsorhelpee.page.scss']
})
export class SponsorListPage implements OnInit {
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


