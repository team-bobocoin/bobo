import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-market',
    templateUrl: 'market.page.html',
    styleUrls: ['market.page.scss']
})
export class MarketPage implements OnInit {
    category = 'food';

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    getitem() {

    }
}
