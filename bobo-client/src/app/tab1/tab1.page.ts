import {Component, OnInit} from '@angular/core';
import {HellpeeService} from '../../shared/services/hellpee.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    hellpees = [];

    constructor(private hellpeeService: HellpeeService) {
    }

    ngOnInit() {
        this.hellpeeService.getHellpees()
            .subscribe((data: any) => {
                this.hellpees = data.hellpees;
            });
    }
}
