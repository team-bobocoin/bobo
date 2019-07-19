import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-donate',
    templateUrl: 'donate.page.html',
    styleUrls: ['donate.page.scss']
})
export class DonatePage implements OnInit {
    amount = 0;

    constructor() {
    }

    ngOnInit() {
    }

    plusMoney(amount: number) {
        this.amount += amount;
    }
}
